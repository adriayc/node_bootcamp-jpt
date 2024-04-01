const express = require('express');
// Controllers
const clienteController = require('../controllers/clienteController');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    // Agregar nuevo cliente
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    // Retornar el router
    return router;
}