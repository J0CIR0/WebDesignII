const express = require('express');
const {
    obtenerSubastas,
    obtenerSubastaPorId,
    crearSubasta,
    realizarPuja,
    misSubastas,
    misPujas
} = require('../controllers/subastaController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', obtenerSubastas);
router.get('/:id', obtenerSubastaPorId);
router.post('/', verificarToken, crearSubasta);
router.post('/:id/pujar', verificarToken, realizarPuja);
router.get('/mis/subastas', verificarToken, misSubastas);
router.get('/mis/pujas', verificarToken, misPujas);

module.exports = router;