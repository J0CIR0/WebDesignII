const express = require('express');
const {
	registrarUsuario,
	loginUsuario,
	obtenerPerfil
} = require('../controllers/usuarioController');
const verificarToken = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, obtenerPerfil);
module.exports = router;