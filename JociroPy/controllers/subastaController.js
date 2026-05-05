const db = require('../src/config/db');

const obtenerSubastas = async (req, res) => {
    try {
        const [subastas] = await db.promise().query(`
            SELECT s.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion,
                   p.foto_url, p.video_url,
                   u.nombre as vendedor_nombre
            FROM subastas s
            JOIN productos p ON s.producto_id = p.id
            JOIN usuarios u ON p.usuario_id = u.id
            WHERE s.activa = TRUE AND s.fecha_fin > NOW()
            ORDER BY s.fecha_fin ASC
        `);
        res.json({ subastas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener subastas' });
    }
};

const obtenerSubastaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [subastas] = await db.promise().query(`
            SELECT s.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion,
                   p.foto_url, p.video_url,
                   u.nombre as vendedor_nombre, u.id as vendedor_id
            FROM subastas s
            JOIN productos p ON s.producto_id = p.id
            JOIN usuarios u ON p.usuario_id = u.id
            WHERE s.id = ?
        `, [id]);
        
        if (subastas.length === 0) {
            return res.status(404).json({ mensaje: 'Subasta no encontrada' });
        }
        
        const [ofertas] = await db.promise().query(`
            SELECT o.*, u.nombre as usuario_nombre
            FROM ofertas o
            JOIN usuarios u ON o.usuario_id = u.id
            WHERE o.subasta_id = ?
            ORDER BY o.monto DESC
        `, [id]);
        
        res.json({ subasta: subastas[0], ofertas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener subasta' });
    }
};

const crearSubasta = async (req, res) => {
    const connection = await db.promise().getConnection();
    try {
        await connection.beginTransaction();
        const usuarioId = req.usuarioId;
        const { producto_id, precio_inicial, precio_minimo, duracion_horas, tiempo_extra_minutos, fecha_inicio } = req.body;
        
        const [productos] = await connection.query(
            'SELECT * FROM productos WHERE id = ? AND usuario_id = ?',
            [producto_id, usuarioId]
        );
        
        if (productos.length === 0) {
            await connection.rollback();
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        const fechaInicio = new Date(fecha_inicio);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setHours(fechaFin.getHours() + duracion_horas);
        
        const [resultado] = await connection.query(
            `INSERT INTO subastas 
             (producto_id, precio_inicial, precio_minimo, duracion_horas, 
              tiempo_extra_minutos, fecha_inicio, fecha_fin, oferta_actual)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [producto_id, precio_inicial, precio_minimo, duracion_horas,
             tiempo_extra_minutos, fechaInicio, fechaFin, precio_inicial]
        );
        
        await connection.commit();
        res.status(201).json({ mensaje: 'Subasta creada', subasta_id: resultado.insertId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ mensaje: 'Error al crear subasta' });
    } finally {
        connection.release();
    }
};

const realizarPuja = async (req, res) => {
    const connection = await db.promise().getConnection();
    try {
        await connection.beginTransaction();
        const usuarioId = req.usuarioId;
        const { id } = req.params;
        const { monto } = req.body;
        
        const [subastas] = await connection.query(
            `SELECT s.*, p.usuario_id as vendedor_id 
             FROM subastas s
             JOIN productos p ON s.producto_id = p.id
             WHERE s.id = ? AND s.activa = TRUE AND s.fecha_fin > NOW()`,
            [id]
        );
        
        if (subastas.length === 0) {
            await connection.rollback();
            return res.status(400).json({ mensaje: 'Subasta no disponible' });
        }
        
        const subasta = subastas[0];
        
        if (subasta.vendedor_id === usuarioId) {
            await connection.rollback();
            return res.status(400).json({ mensaje: 'No puedes pujar en tu propia subasta' });
        }
        
        if (monto <= subasta.oferta_actual) {
            await connection.rollback();
            return res.status(400).json({ mensaje: `La puja debe ser mayor a ${subasta.oferta_actual}` });
        }
        
        const [usuarios] = await connection.query(
            'SELECT saldo_ganacoins FROM usuarios WHERE id = ?',
            [usuarioId]
        );
        
        if (usuarios[0].saldo_ganacoins < monto) {
            await connection.rollback();
            return res.status(400).json({ mensaje: 'Saldo insuficiente' });
        }
        
        const [ofertaResult] = await connection.query(
            'INSERT INTO ofertas (subasta_id, usuario_id, monto) VALUES (?, ?, ?)',
            [id, usuarioId, monto]
        );
        
        const nuevaFechaFin = new Date(subasta.fecha_fin);
        nuevaFechaFin.setMinutes(nuevaFechaFin.getMinutes() + subasta.tiempo_extra_minutos);
        
        await connection.query(
            'UPDATE subastas SET oferta_actual = ?, fecha_fin = ? WHERE id = ?',
            [monto, nuevaFechaFin, id]
        );
        
        await connection.query(
            'UPDATE usuarios SET saldo_ganacoins = saldo_ganacoins - ? WHERE id = ?',
            [monto, usuarioId]
        );
        
        await connection.query(
            `INSERT INTO transacciones (usuario_id, tipo, monto, descripcion, subasta_id, oferta_id)
             VALUES (?, 'puja', ?, ?, ?, ?)`,
            [usuarioId, monto, `Puja en subasta ${id}`, id, ofertaResult.insertId]
        );
        
        await connection.commit();
        res.json({ mensaje: 'Puja realizada', nueva_oferta: monto, nueva_fecha_fin: nuevaFechaFin });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ mensaje: 'Error al realizar puja' });
    } finally {
        connection.release();
    }
};

const misSubastas = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const [subastas] = await db.promise().query(`
            SELECT s.*, p.nombre as producto_nombre
            FROM subastas s
            JOIN productos p ON s.producto_id = p.id
            WHERE p.usuario_id = ?
            ORDER BY s.created_at DESC
        `, [usuarioId]);
        res.json({ subastas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tus subastas' });
    }
};

const misPujas = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const [pujas] = await db.promise().query(`
            SELECT o.*, s.id as subasta_id, s.activa, s.fecha_fin,
                   p.nombre as producto_nombre
            FROM ofertas o
            JOIN subastas s ON o.subasta_id = s.id
            JOIN productos p ON s.producto_id = p.id
            WHERE o.usuario_id = ?
            ORDER BY o.created_at DESC
        `, [usuarioId]);
        res.json({ pujas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tus pujas' });
    }
};

module.exports = {
    obtenerSubastas,
    obtenerSubastaPorId,
    crearSubasta,
    realizarPuja,
    misSubastas,
    misPujas
};