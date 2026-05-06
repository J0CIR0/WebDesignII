const express = require('express');
const { obtenerSubastas, crearSubasta, realizarPuja } = require('../controllers/subastaController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', obtenerSubastas);
router.post('/', verificarToken, crearSubasta);
router.post('/:id/pujar', verificarToken, realizarPuja);

module.exports = router;