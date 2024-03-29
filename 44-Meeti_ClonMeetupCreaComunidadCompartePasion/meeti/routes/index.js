const express = require('express');
// Controllers
const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const grupoController = require('../controllers/grupoController');
const meetiController = require('../controllers/meetiController');
// Frontend
const meetiControllerFE = require('../controllers/frontend/meetiControllerFE');
const usuarioControllerFE = require('../controllers/frontend/usuarioControllerFE');
const grupoControllerFE = require('../controllers/frontend/grupoControllerFE');


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

    /** AREA PUBLICA */

    router.get('/', homeController.home);

    // Muestra un meeti
    router.get('/meeti/:slug', meetiControllerFE.mostrarMeeti);

    // Confirmar asitencia a meeti
    router.post('/confirmar-asistencia/:slug', meetiControllerFE.confirmarAsistencia);

    // Muestra asistentes
    router.get('/asistentes/:slug', meetiControllerFE.mostrarAsistentes);

    // Muestra perfiles en el frontend
    router.get('/usuarios/:id', usuarioControllerFE.mostrarUsuario);

    // Muestra grupos en el fronted
    router.get('/grupos/:id', grupoControllerFE.mostrarGrupo)

    // Crear cuenta
    router.get('/crear-cuenta', usuarioController.formCrearCuenta);
    router.post('/crear-cuenta', usuarioController.crearNuevaCuenta);
    // Confirmar cuenta
    router.get('/confirmar-cuenta/:correo', usuarioController.confirmarCuenta);

    // Iniciar sesion
    router.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // Cerrar sesion
    router.get('/cerrar-sesion', authController.usuarioAutenticado, authController.cerrarSesion);


    /** AREA PRIVADA */

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

    // Eliminar grupo
    router.get('/eliminar-grupo/:grupoId', authController.usuarioAutenticado, grupoController.formEliminarGrupo);
    router.post('/eliminar-grupo/:grupoId', authController.usuarioAutenticado, grupoController.eliminarGrupo);

    // Nuevos meeti
    router.get('/nuevo-meeti', authController.usuarioAutenticado, meetiController.formNuevoMeeti);
    router.post('/nuevo-meeti', authController.usuarioAutenticado, meetiController.sanitizarMeeti, meetiController.crearMeeti);

    // Editar meeti
    router.get('/editar-meeti/:id', authController.usuarioAutenticado, meetiController.formEditarMeeti);
    router.post('/editar-meeti/:id', authController.usuarioAutenticado, meetiController.editarMeeti);

    // Eliminar meeti
    router.get('/eliminar-meeti/:id', authController.usuarioAutenticado, meetiController.formEliminarMeeti);
    router.post('/eliminar-meeti/:id', authController.usuarioAutenticado, meetiController.eliminarMeeti);

    // Editar informacion de perfil
    router.get('/editar-perfil', authController.usuarioAutenticado, usuarioController.formEditarPerfil);
    router.post('/editar-perfil', authController.usuarioAutenticado, usuarioController.editarPerfil);

    // Editar el password
    router.get('/cambiar-password', authController.usuarioAutenticado, usuarioController.formCambiarPassword);
    router.post('/cambiar-password', authController.usuarioAutenticado, usuarioController.cambiarPassword);

    // Editar imagen de perfil
    router.get('/imagen-perfil', authController.usuarioAutenticado, usuarioController.formEditarImagenPerfil);
    router.post('/imagen-perfil', authController.usuarioAutenticado, usuarioController.subirImagen, usuarioController.editarImagenPerfil);

    return router;
};