const express = require('express');
// Controllers
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');

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


    // Agrega nuevo producto (Subir archivos)
    router.post('/productos', productoController.subirArchivo, productoController.nuevoProducto);

    // Obtener todos los productos
    router.get('/productos', productoController.mostrarProductos);

    // Obtenner un producto (By ID)
    router.get('/productos/:id', productoController.mostrarProducto);

    // Actualizar un producto (By ID)
    router.put('/productos/:id', productoController.subirArchivo, productoController.actualizarProducto);

    // Eliminar un producto (By ID)
    router.delete('/productos/:id', productoController.eliminarProducto);


    // Agregar nuevo pedido
    router.post('/pedidos', pedidoController.nuevoPedido);

    // Retornar el router
    return router;
}