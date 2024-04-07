const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Routes config
const routes = require('./routes/index');

// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/restapis_db', {
    // useNewUrlParser: true       // Deprecated
});

// Inicializar el servidor
const app = express();

// Habilitar bodyParser (Envio de solicitudes POST)
app.use(bodyParser.json());                             // Parse application/json
app.use(bodyParser.urlencoded({extended: true}));       // Parse application/x-www-form-urlencoded

// Habilitar el CORS
app.use(cors());

// Habilitar el routes
app.use('/', routes());

// Habilitamos el puerto
app.listen(5000);
