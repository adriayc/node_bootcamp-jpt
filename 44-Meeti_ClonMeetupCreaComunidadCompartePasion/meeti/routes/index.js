const express = require('express');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) => {
        // res.send('Inicio');
        res.render('home');
    });

    router.get('/crear-cuenta', (req, res) => {
        // res.send('Crear Cuenta');
        res.render('crear-cuenta');
    });

    return router;
};