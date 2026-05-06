const express = require('express');
const cors = require('cors');
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
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

process.on('unhandledRejection', (reason) => {
    console.error('Promise rechazada sin manejar:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Excepción no capturada:', error);
    process.exit(1);
});