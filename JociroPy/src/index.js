const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usuarioRoutes = require('../routes/usuarioRoutes');
const subastaRoutes = require('./routes/subastaRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/subastas', subastaRoutes);
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ya da',
        mensaje: 'funca o no funca? funca',
        timestamp: new Date()
    });
});
app.get('/api', (req, res) => {
    res.json({
        mensaje: 'API de JociroPY funcionando',
        rutas_disponibles: [
            'GET /api/health',
            'GET /api/usuarios/perfil',
            'POST /api/usuarios/registro',
            'POST /api/usuarios/login',
            'GET /api/productos',
            'POST /api/productos',
            'PUT /api/productos/:id',
            'DELETE /api/productos/:id'
        ]
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});