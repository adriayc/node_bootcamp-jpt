const express = require('express');
// Routes config
const routes = require('./routes/index');

// Inicializar el servidor
const app = express();

// Habilitar el routes
app.use('/', routes());

// Habilitamos el puerto
app.listen(5000);