const express = require('express');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) => {
        res.send('Inicio');
    });

    router.get('/nosotros', (req, res) => {
        res.send('Nosotros');
    });

    // Retornar el router
    return router;
}