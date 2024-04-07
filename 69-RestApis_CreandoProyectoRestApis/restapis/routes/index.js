const express = require('express');
// Middlewares
const auth = require('../middlewares/auth');
// Controllers
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');
const usuarioController = require('../controllers/usuarioController');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    // Agregar nuevo cliente
    router.post('/clientes', auth, clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes)

    // Obtener un cliente (By ID)
    router.get('/clientes/:id', auth, clienteController.mostrarCliente);

    // Actualizar un cliente (By ID)
    router.put('/clientes/:id', auth, clienteController.actualizarCliente);

    // Eliminar un cliente (By ID)
    router.delete('/clientes/:id', auth, clienteController.eliminarCliente);


    // Agrega nuevo producto (Subir archivos)
    router.post('/productos', auth, productoController.subirArchivo, productoController.nuevoProducto);

    // Obtener todos los productos
    router.get('/productos', auth, productoController.mostrarProductos);

    // Obtenner un producto (By ID)
    router.get('/productos/:id', auth, productoController.mostrarProducto);

    // Actualizar un producto (By ID)
    router.put('/productos/:id', auth, productoController.subirArchivo, productoController.actualizarProducto);

    // Eliminar un producto (By ID)
    router.delete('/productos/:id', auth, productoController.eliminarProducto);

    // Buscar productos
    router.post('/productos/busqueda/:query', auth, productoController.buscarProductos)


    // Agregar nuevo pedido
    router.post('/pedidos', auth, pedidoController.nuevoPedido);

    // Obtener todos los pedidos
    router.get('/pedidos', auth, pedidoController.mostrarPedidos);

    // Obtener un pedido (By ID)
    router.get('/pedidos/:id', auth, pedidoController.mostrarPedido);

    // Actualizar un pedido (By ID)
    router.put('/pedidos/:id', auth, pedidoController.actualizarPedido);

    // Eliminar un pedido por ID
    router.delete('/pedidos/:id', auth, pedidoController.eliminarPedido);


    // Crear usuarios
    router.post('/crear-cuenta', auth,  usuarioController.registrarUsuario);

    // Iniciar sesion (Autenticar)
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    // Retornar el router
    return router;
}
