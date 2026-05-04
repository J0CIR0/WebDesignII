const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        if (!nombre || !email || !password) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }
        
        const [usuariosExistentes] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        
        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya esta registrado' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);
        
        const [resultado] = await db.promise().query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, passwordEncriptada]
        );
        
        const token = jwt.sign(
            { id: resultado.insertId, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            token: token,
            usuario: {
                id: resultado.insertId,
                nombre: nombre,
                email: email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
        }
        
        const [usuarios] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        
        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' });
        }
        
        const usuario = usuarios[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' });
        }
        
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            mensaje: 'Login exitoso',
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = { registrarUsuario, loginUsuario };