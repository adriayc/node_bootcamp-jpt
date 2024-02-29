const express = require('express');
// Controllers
const homeController = require('../controllers/homeController');
const vacanteController = require('../controllers/vacanteController');

const router = express.Router();

module.exports = () => {
    // router.get('/', (req, res) => {
    //     res.send('Hola Mundo NodeJS!');
    // });
    router.get('/', homeController.mostrarTrabajos);

    // Crear vacantes
    router.get('/vacantes/nueva', vacanteController.formularioNuevoVacante);

    return router;
};