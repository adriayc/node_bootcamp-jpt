const mongoose = require('mongoose');
// Env
require('dotenv').config({path: 'variables.env'});

// mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});         // Warning! useNewUrlParser deprecado
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', error => {
    console.log(error);
});

// Importar los modelos
require('../models/Usuarios');
require('../models/Vacantes');