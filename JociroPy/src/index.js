const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoutes');
const subastaRoutes = require('./routes/subastaRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/subastas', subastaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});