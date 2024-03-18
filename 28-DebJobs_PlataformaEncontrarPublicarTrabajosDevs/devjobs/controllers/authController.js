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

exports.cerrarSesion = (req, res) => {
    // Metodo para cerrar sesión en passport
    req.logout();

    req.flash('correcto', 'Cerrarste sesión correctamente');
    // Redireccionar
    return res.redirect('/inciar-sesion');
};

// Verificar que el usuario este autenticado
exports.verificarUsuario = (req, res, next) => {

    // Revisar el usuario (isAuthenticated methodo de passport)
    if (req.isAuthenticated()) {
        // Pasar al siguiente middleware
        return next();
    }

    req.flash('correcto', 'Cerraste sesión correctamente');
    // Redireccionar
    res.redirect('/iniciar-sesion');
};

exports.mostrarPanel = async (req, res) => {
    // Obtener las vacantes
    // const vacantes = await Vacante.find({autor: req.user._id});
    const vacantes = await Vacante.find({autor: req.user._id}).lean();
    // console.log(vacantes);

    res.render('administracion', {
        nombrePagina: 'Panel de Admistración',
        tagline: 'Crear y Adminstra tus vacantes desde aquí',
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        cerrarSesion: true,
        vacantes
    });
};