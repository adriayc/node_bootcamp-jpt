const express = require('express');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) => {
        res.send('Inicio');
    });

    router.get('/crear-cuenta', (req, res) => {
        res.send('Crear Cuenta');
    });

    return router;
};