const express = require('express');
// Controllers
const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const grupoController = require('../controllers/grupoController');

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
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // Panel de administracion
    router.get('/administracion', authController.usuarioAutenticado, adminController.panelAdministracion);

    // Nuevos grupos
    router.get('/nuevo-grupo', authController.usuarioAutenticado, grupoController.formNuevoGrupo);
    router.post('/nuevo-grupo', authController.usuarioAutenticado, grupoController.subirImagen, grupoController.crearGrupo);

    // Editar grupos
    router.get('/editar-grupo/:grupoId', authController.usuarioAutenticado, grupoController.formEditarGrupo);
    router.post('/editar-grupo/:grupoId', authController.usuarioAutenticado, grupoController.editarGrupo);

    // Editar imagen
    router.get('/imagen-grupo/:grupoId', authController.usuarioAutenticado, grupoController.formEditarImagen);
    router.post('/imagen-grupo/:grupoId', authController.usuarioAutenticado, grupoController.subirImagen, grupoController.editarImagen);

    return router;
};