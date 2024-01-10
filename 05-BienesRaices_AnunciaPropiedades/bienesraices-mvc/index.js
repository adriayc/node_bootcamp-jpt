// OLD - CommonJS
// const express = require('express');
// NEW - ECMAScript modules
import express from 'express';
// Customs routes
import usuarioRoutes from './routes/usuarioRoutes.js';

// Crear la app
const app = express();

// Routing
// app.get('/', usuarioRoutes);     // Busca un ruta especifica
app.use('/', usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor funcionado en el puerto ${port}`);
});