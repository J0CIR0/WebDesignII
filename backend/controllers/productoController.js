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
        const { nombre, descripcion, precio_fijo } = req.body;
        if (!nombre || !descripcion || !precio_fijo) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const [resultado] = await db.promise().query(
            'INSERT INTO productos (nombre, descripcion, precio_fijo, usuario_id) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio_fijo, req.usuarioId]
        );
        res.status(201).json({ id: resultado.insertId, nombre, descripcion, precio_fijo });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio_fijo } = req.body;
        if (!nombre || !descripcion || !precio_fijo) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const [resultado] = await db.promise().query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio_fijo = ? WHERE id = ? AND usuario_id = ?',
            [nombre, descripcion, precio_fijo, id, req.usuarioId]
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
    let connection;
    try {
        connection = await db.promise().getConnection();
        const { id } = req.params;
        await connection.beginTransaction();

        const [productos] = await connection.query(
            'SELECT id FROM productos WHERE id = ? AND usuario_id = ?',
            [id, req.usuarioId]
        );

        if (productos.length === 0) {
            await connection.rollback();
            return res.status(404).json({ mensaje: 'Producto no encontrado o no tienes permiso' });
        }

        await connection.query(
            'DELETE FROM ofertas WHERE subasta_id IN (SELECT id FROM subastas WHERE producto_id = ?)',
            [id]
        );

        await connection.query(
            'DELETE FROM subastas WHERE producto_id = ?',
            [id]
        );

        const [resultado] = await connection.query(
            'DELETE FROM productos WHERE id = ? AND usuario_id = ?',
            [id, req.usuarioId]
        );

        if (resultado.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ mensaje: 'Producto no encontrado o no tienes permiso' });
        }

        await connection.commit();
        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error en eliminarProducto:', error);
        const respuestaError = { mensaje: 'Error al eliminar producto', error: error.message };
        if (process.env.NODE_ENV === 'development') respuestaError.stack = error.stack;
        res.status(500).json(respuestaError);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto };