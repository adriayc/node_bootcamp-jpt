const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// Configurar dotenv
require('dotenv').config({path: 'variables.env'});
// Routers
const router = require('./routes');

// Inicializar express
const app = express();

// Habilitar express layout
app.use(expressLayouts);

// Habilitar EJS como template engine
app.set('view engine', 'ejs');

// Ubicacion de la vistas
app.set('views', path.join(__dirname, './views'));

// Archivos staticos
app.use(express.static('public'));

// Customs Middleware (usuuarios logueados, flash message, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    // Siguiente middleware
    next();
});

// Habilitar rutas
app.use('/', router());

// Agregar el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionado');
});