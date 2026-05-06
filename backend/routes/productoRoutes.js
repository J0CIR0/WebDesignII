const express = require('express');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, obtenerProductos);
router.post('/', verificarToken, crearProducto);
router.put('/:id', verificarToken, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

module.exports = router;