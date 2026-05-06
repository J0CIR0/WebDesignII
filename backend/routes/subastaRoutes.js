const express = require('express');
const { obtenerSubastas, obtenerSubastaPorId, crearSubasta, realizarPuja } = require('../controllers/subastaController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', obtenerSubastas);
router.get('/:id', obtenerSubastaPorId);
router.post('/', verificarToken, crearSubasta);
router.post('/:id/pujar', verificarToken, realizarPuja);

module.exports = router;