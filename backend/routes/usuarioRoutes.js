const express = require('express');
const { registrarUsuario, loginUsuario, obtenerSaldo, agregarSaldo } = require('../controllers/usuarioController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/saldo', verificarToken, obtenerSaldo);
router.post('/saldo/agregar', verificarToken, agregarSaldo);

module.exports = router;