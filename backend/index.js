const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET no está configurado en .env');
    process.exit(1);
}

const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const subastaRoutes = require('./routes/subastaRoutes');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const frontendBuildPath = path.join(__dirname, '../frontend/build');

app.use(express.static(frontendBuildPath));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'Servidor ejecutándose correctamente',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/subastas', subastaRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
app.use('*', (req, res) => {
    res.status(404).json({ 
        mensaje: 'Ruta no encontrada',
        path: req.originalUrl,
        method: req.method
    });
});

app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err.message);
    res.status(500).json({ 
        mensaje: 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Cierra el proceso anterior antes de arrancar otro backend.`);
        process.exit(1);
    }
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
});

const db = require('./src/config/db');
const finalizarSubastas = async () => {
    try {
        const [ended] = await db.promise().query('SELECT id FROM subastas WHERE activa = 1 AND fecha_fin <= NOW()');
        if (!ended || ended.length === 0) return;

        for (const row of ended) {
            const connection = await db.promise().getConnection();
            try {
                await connection.beginTransaction();
                const subastaId = row.id;
                
                const [subastas] = await connection.query(
                    'SELECT s.id, s.producto_id, p.usuario_id as vendedor_id FROM subastas s JOIN productos p ON s.producto_id = p.id WHERE s.id = ? FOR UPDATE',
                    [subastaId]
                );
                
                if (!subastas || subastas.length === 0) {
                    await connection.query('UPDATE subastas SET activa = 0 WHERE id = ?', [subastaId]);
                    await connection.commit();
                    connection.release();
                    continue;
                }
                
                const vendedor_id = subastas[0].vendedor_id;
                
                const [ofertaTop] = await connection.query('SELECT usuario_id, monto FROM ofertas WHERE subasta_id = ? ORDER BY monto DESC LIMIT 1', [subastaId]);

                if (!ofertaTop || ofertaTop.length === 0) {
                    await connection.query('UPDATE subastas SET activa = 0 WHERE id = ?', [subastaId]);
                    await connection.commit();
                    connection.release();
                    continue;
                }

                const winner = ofertaTop[0];

                const [usuarios] = await connection.query('SELECT saldo_ganacoins FROM usuarios WHERE id = ? FOR UPDATE', [winner.usuario_id]);
                if (!usuarios || usuarios.length === 0) {
                    await connection.query('UPDATE subastas SET activa = 0 WHERE id = ?', [subastaId]);
                    await connection.commit();
                    connection.release();
                    continue;
                }

                const saldo = usuarios[0].saldo_ganacoins;
                if (saldo < winner.monto) {
                    await connection.query('UPDATE subastas SET activa = 0 WHERE id = ?', [subastaId]);
                    await connection.commit();
                    connection.release();
                    continue;
                }

                await connection.query('UPDATE usuarios SET saldo_ganacoins = saldo_ganacoins - ? WHERE id = ?', [winner.monto, winner.usuario_id]);
                await connection.query('UPDATE usuarios SET saldo_ganacoins = saldo_ganacoins + ? WHERE id = ?', [winner.monto, vendedor_id]);
                await connection.query('UPDATE subastas SET activa = 0 WHERE id = ?', [subastaId]);
                await connection.commit();
                connection.release();
            } catch (err) {
                try { await connection.rollback(); } catch (e) {}
                try { connection.release(); } catch (e) {}
                console.error('Error finalizando subasta:', err.message);
            }
        }
    } catch (error) {
        console.error('Error en job finalizarSubastas:', error.message);
    }
};

finalizarSubastas();
setInterval(finalizarSubastas, 15 * 1000);

process.on('unhandledRejection', (reason) => {
    console.error('Promise rechazada sin manejar:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Excepción no capturada:', error);
    process.exit(1);
});