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
    router.get('/vacantes/nueva', vacanteController.formularioNuevoVacante);
    router.post('/vacantes/nueva', vacanteController.agregarVacante);

    // Mostrar vacante
    router.get('/vacantes/:url', vacanteController.mostrarVacante);

    // Editar vacante
    router.get('/vacantes/editar/:url', vacanteController.formEditarVacante);
    router.post('/vacantes/editar/:url', vacanteController.editarVacante);

    // Crear cuentas
    router.get('/crear-cuenta', usuarioController.formCrearCuenta);
    router.post('/crear-cuenta', usuarioController.validarRegistro,  usuarioController.crearUsuario);

    // Autenticar usuarios
    router.get('/iniciar-sesion', usuarioController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)

    return router;
};