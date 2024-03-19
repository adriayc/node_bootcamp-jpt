const express = require('express');
// Configurar dotenv
require('dotenv').config({path: 'variables.env'});

// Inicializar express
const app = express();

app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionado');
});