const db = require('../src/config/db');

const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await db.promise().query(
            'SELECT * FROM productos WHERE usuario_id = ?',
            [req.usuarioId]
        );
        res.json({ productos });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio_fijo, stock } = req.body;
        if (!nombre || !descripcion || !precio_fijo || stock === undefined) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const [resultado] = await db.promise().query(
            'INSERT INTO productos (nombre, descripcion, precio_fijo, stock, usuario_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio_fijo, stock, req.usuarioId]
        );
        res.status(201).json({ id: resultado.insertId, nombre, descripcion, precio_fijo, stock });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio_fijo, stock } = req.body;
        if (!nombre || !descripcion || !precio_fijo || stock === undefined) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const [resultado] = await db.promise().query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio_fijo = ?, stock = ? WHERE id = ? AND usuario_id = ?',
            [nombre, descripcion, precio_fijo, stock, id, req.usuarioId]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado o no tienes permiso' });
        }

        res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await db.promise().query(
            'DELETE FROM productos WHERE id = ? AND usuario_id = ?',
            [id, req.usuarioId]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado o no tienes permiso' });
        }

        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
    }
};

module.exports = { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto };