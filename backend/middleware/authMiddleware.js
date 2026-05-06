const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado - Token requerido' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET no está configurado');
        return res.status(500).json({ mensaje: 'Error en configuración del servidor' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ mensaje: 'Token expirado' });
        }
        return res.status(403).json({ mensaje: 'Token inválido' });
    }
};

module.exports = verificarToken;