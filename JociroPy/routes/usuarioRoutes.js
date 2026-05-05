const express = require('express');
const {
	registrarUsuario,
	loginUsuario,
	obtenerPerfil
} = require('../controllers/usuarioController');
const { registrarUsuario, loginUsuario, obtenerPerfil, obtenerSaldo, recargarCredits } = require('../controllers/usuarioController');
const verificarToken = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/saldo', verificarToken, obtenerSaldo);
router.post('/recargar', verificarToken, recargarCredits);
module.exports = router;