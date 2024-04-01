const express = require('express');
// Controllers
const clienteController = require('../controllers/clienteController');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    // Agregar nuevo cliente
    router.post('/clientes', clienteController.nuevoCliente);

    // Retornar el router
    return router;
}