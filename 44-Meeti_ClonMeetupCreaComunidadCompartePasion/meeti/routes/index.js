const express = require('express');
// Controllers
const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');

// Inicializar el router
const router = express.Router();

module.exports = function() {
    /*
    router.get('/', (req, res) => {
        // res.send('Inicio');
        res.render('home');
    });
    */

    /*
    router.get('/crear-cuenta', (req, res) => {
        // res.send('Crear Cuenta');
        res.render('crear-cuenta');
    });
    */

    router.get('/', homeController.home);

    // Crear cuenta
    router.get('/crear-cuenta', usuarioController.formCrearCuenta);
    router.post('/crear-cuenta', usuarioController.crearNuevaCuenta);
    // Confirmar cuenta
    router.get('/confirmar-cuenta/:correo', usuarioController.confirmarCuenta);

    // Iniciar sesion
    router.get('/iniciar-sesion', usuarioController.formIniciarSesion);

    return router;
};