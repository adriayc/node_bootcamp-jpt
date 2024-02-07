// OLD - CommonJS
// const express = require('express');
// NEW - ECMAScript modules
import express from 'express';
// CSurf - Protección CSRF
import csrf from 'csurf';
// Cookie Parser
import cookieParser from 'cookie-parser';
// DBs
import db from './config/db.js';
// Customs routes
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}));

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF
app.use(csrf({cookie: true}));

// Conexión a la base de datos
try {
    await db.authenticate();
    db.sync();                  // Sincronizar los modelos del ORM con DB
    console.log('Conexión correcta a la Base de Datos')

} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta Pública
app.use(express.static('public'));

// Routing
app.use('/', appRoutes);
// app.get('/', usuarioRoutes);     // Busca un ruta especifica
// app.use('/', usuarioRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor funcionado en el puerto ${port}`);
});