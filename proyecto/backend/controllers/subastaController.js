const db = require('../src/config/db');

const obtenerSubastas = async (req, res) => {
    try {
        const [subastas] = await db.promise().query(`
            SELECT s.*, p.nombre as producto_nombre, u.nombre as vendedor_nombre
            FROM subastas s
            JOIN productos p ON s.producto_id = p.id
            JOIN usuarios u ON p.usuario_id = u.id
            WHERE s.activa = 1 AND s.fecha_fin > NOW()
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

        const [subastas] = await db.promise().query(
            `SELECT s.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion,
                    p.usuario_id as vendedor_id, u.nombre as vendedor_nombre
             FROM subastas s
             JOIN productos p ON s.producto_id = p.id
             JOIN usuarios u ON p.usuario_id = u.id
             WHERE s.id = ?
             LIMIT 1`,
            [id]
        );

        if (subastas.length === 0) {
            return res.status(404).json({ mensaje: 'Subasta no encontrada' });
        }

        const [ofertas] = await db.promise().query(
            `SELECT o.id, o.monto, o.created_at, u.nombre as usuario_nombre
             FROM ofertas o
             JOIN usuarios u ON o.usuario_id = u.id
             WHERE o.subasta_id = ?
             ORDER BY o.created_at DESC`,
            [id]
        );

        res.json({ subasta: subastas[0], ofertas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener subasta' });
    }
};

const crearSubasta = async (req, res) => {
    try {
        const { producto_id, precio_inicial, precio_minimo, duracion_horas, tiempo_extra_minutos, fecha_inicio } = req.body;
        
        const [productos] = await db.promise().query('SELECT * FROM productos WHERE id = ? AND usuario_id = ?', [producto_id, req.usuarioId]);
        module.exports = { obtenerSubastas, obtenerSubastaPorId, crearSubasta, realizarPuja };
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        const fechaFin = new Date(fecha_inicio);
        fechaFin.setHours(fechaFin.getHours() + duracion_horas);

        const [resultado] = await db.promise().query(
            `INSERT INTO subastas (producto_id, precio_inicial, precio_minimo, duracion_horas, 
             tiempo_extra_minutos, fecha_inicio, fecha_fin, oferta_actual)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [producto_id, precio_inicial, precio_minimo, duracion_horas, tiempo_extra_minutos, fecha_inicio, fechaFin, precio_inicial]
        );

        res.status(201).json({ mensaje: 'Subasta creada', subasta_id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear subasta' });
    }
};

const realizarPuja = async (req, res) => {
    try {
        const { id } = req.params;
        const { monto } = req.body;

        const [subastas] = await db.promise().query(
            `SELECT s.*, p.usuario_id as vendedor_id FROM subastas s
             JOIN productos p ON s.producto_id = p.id
             WHERE s.id = ? AND s.activa = 1 AND s.fecha_fin > NOW()`,
            [id]
        );

        if (subastas.length === 0) {
            return res.status(400).json({ mensaje: 'Subasta no disponible' });
        }

        const subasta = subastas[0];

        if (subasta.vendedor_id === req.usuarioId) {
            return res.status(400).json({ mensaje: 'No puedes pujar en tu propia subasta' });
        }

        if (monto <= subasta.oferta_actual) {
            return res.status(400).json({ mensaje: `La puja debe ser mayor a ${subasta.oferta_actual}` });
        }

        const [usuarios] = await db.promise().query('SELECT saldo_ganacoins FROM usuarios WHERE id = ?', [req.usuarioId]);
        if (usuarios[0].saldo_ganacoins < monto) {
            return res.status(400).json({ mensaje: 'Saldo insuficiente' });
        }

        await db.promise().query('INSERT INTO ofertas (subasta_id, usuario_id, monto) VALUES (?, ?, ?)', [id, req.usuarioId, monto]);

        const nuevaFechaFin = new Date(subasta.fecha_fin);
        nuevaFechaFin.setMinutes(nuevaFechaFin.getMinutes() + subasta.tiempo_extra_minutos);

        await db.promise().query('UPDATE subastas SET oferta_actual = ?, fecha_fin = ? WHERE id = ?', [monto, nuevaFechaFin, id]);
        await db.promise().query('UPDATE usuarios SET saldo_ganacoins = saldo_ganacoins - ? WHERE id = ?', [monto, req.usuarioId]);

        res.json({ mensaje: 'Puja realizada', nueva_oferta: monto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al realizar puja' });
    }
};

module.exports = { obtenerSubastas, crearSubasta, realizarPuja };