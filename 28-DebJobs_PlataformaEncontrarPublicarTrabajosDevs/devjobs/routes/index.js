const express = require('express');
// Controllers
const homeController = require('../controllers/homeController');
const vacanteController = require('../controllers/vacanteController');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = express.Router();

module.exports = () => {
    // router.get('/', (req, res) => {
    //     res.send('Hola Mundo NodeJS!');
    // });
    router.get('/', homeController.mostrarTrabajos);

    // Crear vacantes
    router.get('/vacantes/nueva', authController.verificarUsuario, vacanteController.formularioNuevoVacante);
    router.post('/vacantes/nueva', authController.verificarUsuario, vacanteController.validarVacante, vacanteController.agregarVacante);

    // Mostrar vacante
    router.get('/vacantes/:url', vacanteController.mostrarVacante);

    // Editar vacante
    router.get('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.formEditarVacante);
    router.post('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.validarVacante, vacanteController.editarVacante);

    // Eliminar vacante
    router.delete('/vacantes/eliminar/:id', vacanteController.eliminarVacante);

    // Crear cuentas
    router.get('/crear-cuenta', usuarioController.formCrearCuenta);
    router.post('/crear-cuenta', usuarioController.validarRegistro,  usuarioController.crearUsuario);

    // Autenticar usuarios
    router.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // Cerrar sesión
    router.get('/cerrar-sesion', authController.autenticarUsuario, authController.cerrarSesion);

    // Reset password (emails)
    router.get('/reestablecer-password', authController.formReestablecerPassword);
    router.post('/reestablecer-password', authController.enviarToken);

    // Reset password (almacenar en la DB)
    router.get('/reestablecer-password/:token', authController.reestablecerPassword);
    router.post('/reestablecer-password/:token', authController.guardarPassword);

    // Panel de admistracion
    router.get('/administracion', authController.verificarUsuario, authController.mostrarPanel);

    // Editar perfil
    router.get('/editar-perfil', authController.verificarUsuario, usuarioController.formEditarPerfil);
    // router.post('/editar-perfil', authController.verificarUsuario, usuarioController.validarPerfil, usuarioController.editarPerfil);
    router.post(
        '/editar-perfil', 
        authController.verificarUsuario, 
        // No funciona validacion con multer
        // usuarioController.validarPerfil, 
        usuarioController.subirImagen,
        usuarioController.editarPerfil
    );

    // Recibir mensajes de cantidatos
    router.post('/vacantes/:url', vacanteController.subirCV, vacanteController.contactar);

    // Muestra los candidatos por vacante
    router.get('/candidatos/:id', authController.verificarUsuario, vacanteController.mostrarCandidatos);

    // Buscador de vacantes
    router.post('/buscador', vacanteController.buscarVacantes);

    return router;
};