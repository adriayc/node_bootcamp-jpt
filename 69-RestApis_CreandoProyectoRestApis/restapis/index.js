const express = require('express');
const mongoose = require('mongoose');
// Routes config
const routes = require('./routes/index');

// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/restapis_db', {
    // useNewUrlParser: true       // Deprecated
});

// Inicializar el servidor
const app = express();

// Habilitar el routes
app.use('/', routes());

// Habilitamos el puerto
app.listen(5000);