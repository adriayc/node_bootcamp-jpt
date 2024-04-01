const express = require('express');
// Controllers
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    // Agregar nuevo cliente
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    // Obtener un cliente (By ID)
    router.get('/clientes/:id', clienteController.mostrarCliente);

    // Actualizar un cliente (By ID)
    router.put('/clientes/:id', clienteController.actualizarCliente);

    // Eliminar un cliente (By ID)
    router.delete('/clientes/:id', clienteController.eliminarCliente);


    // Agrega nuevo producto
    router.post('/productos', productoController.nuevoProducto);

    // Retornar el router
    return router;
}