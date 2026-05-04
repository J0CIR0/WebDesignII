//Importamos el módulo mysql2 para conectarnos a la base de datos MySQL
const mysql = require('mysql2');

//Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

//Creamos una conexión a la base de datos utilizando las variables de entorno
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//Conectamos a la base de datos y manejamos cualquier error que pueda ocurrir durante la conexión
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }       
    console.log('Conexión exitosa');
});

//Exportamos la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;

