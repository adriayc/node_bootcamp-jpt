const passport = require('passport');
const mongoose = require('mongoose');
// Models
const Vacante = mongoose.model('Vacante');
// const Vacante = require('../models/Vacantes');


exports.autenticarUsuario = passport.authenticate('local', {
    // successRedirect: '/ok',
    successRedirect: '/administracion',
    // failureRedirect: '/mal'
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Verificar que el usuario este autenticado
exports.verificarUsuario = (req, res, next) => {

    // Revisar el usuario (isAuthenticated methodo de passport)
    if (req.isAuthenticated()) {
        // Pasar al siguiente middleware
        return next();
    }

    // Redireccionar
    res.redirect('/iniciar-sesion');
};

exports.mostrarPanel = async (req, res) => {
    // Obtener las vacantes
    // const vacantes = await Vacante.find({autor: req.user._id});
    const vacantes = await Vacante.find({autor: req.user._id}).lean();

    res.render('administracion', {
        nombrePagina: 'Panel de Admistración',
        tagline: 'Crear y Adminstra tus vacantes desde aquí',
        nombre: req.user.nombre,
        cerrarSesion: true,
        vacantes
    });
};