// OLD - CommonJS
// const express = require('express');
// NEW - ECMAScript modules
import express from 'express';
// DBs
import db from './config/db.js';
// Customs routes
import usuarioRoutes from './routes/usuarioRoutes.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}));

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
// app.get('/', usuarioRoutes);     // Busca un ruta especifica
// app.use('/', usuarioRoutes);
app.use('/auth', usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor funcionado en el puerto ${port}`);
});