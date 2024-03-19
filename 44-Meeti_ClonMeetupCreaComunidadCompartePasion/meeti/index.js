const express = require('express');
// Configurar dotenv
require('dotenv').config({path: 'variables.env'});
// Routers
const router = require('./routes');

// Inicializar express
const app = express();

app.use('/', router());

// Agregar el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionado');
});