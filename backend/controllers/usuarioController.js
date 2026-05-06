const db = require('../src/config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const [existe] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: 'Email ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [resultado] = await db.promise().query(
            'INSERT INTO usuarios (nombre, email, password, saldo_ganacoins) VALUES (?, ?, ?, 1000)',
            [nombre, email, hashedPassword]
        );

        const token = jwt.sign({ id: resultado.insertId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            usuario: { id: resultado.insertId, nombre, email }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [usuarios] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' });
        }

        const valido = await bcrypt.compare(password, usuarios[0].password);
        if (!valido) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' });
        }

        const token = jwt.sign({ id: usuarios[0].id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            usuario: { id: usuarios[0].id, nombre: usuarios[0].nombre, email }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

const obtenerSaldo = async (req, res) => {
    try {
        const [usuarios] = await db.promise().query('SELECT saldo_ganacoins FROM usuarios WHERE id = ?', [req.usuarioId]);
        res.json({ saldo: usuarios[0].saldo_ganacoins });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener saldo' });
    }
};

module.exports = { registrarUsuario, loginUsuario, obtenerSaldo };