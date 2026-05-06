const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    console.error('ERROR: Faltan variables de entorno en .env');
    console.error('Variables requeridas: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.connect((error) => {
    if (error) {
        console.error('Error de conexión a MySQL:', error.message);
        process.exit(1);
    }
});

connection.on('error', (error) => {
    console.error('Error en la conexión a MySQL:', error.message);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Conexión a la BD perdida');
    }
    if (error.code === 'PROTOCOL_ERROR') {
        console.error('Error de protocolo en la BD');
    }
    if (error.code === 'ER_CON_COUNT_ERROR') {
        console.error('Demasiadas conexiones a la BD');
    }
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('Acceso denegado a la BD');
    }
    if (error.code === 'ER_BAD_DB_ERROR') {
        console.error('Base de datos no existe');
    }
});

module.exports = connection;