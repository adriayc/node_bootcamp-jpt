const crypto = require('crypto');               // Funcionalidad que existe en Node y Express
const passport = require('passport');
const mongoose = require('mongoose');
// Models
const Vacante = mongoose.model('Vacante');
// const Vacante = require('../models/Vacantes');
const Usuario = mongoose.model('Usuarios');


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

// Formulario para reestablecer password
exports.formReestablecerPassword = (req, res) => {
    res.render('reestablecer-password', {
        nombrePagina: 'Reestablecer tu Password',
        tagline: 'Si ya tienes una cuenta pero olvidate tu password, ingresa su email'
    });
};

// Generar el token en la tabla del usuario
exports.enviarToken = async (req, res) => {
    const usuario = await Usuario.findOne({email: req.body.email});

    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        return res.redirect('/iniciar-sesion');
    }

    // El usuario existe, generar token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expira = Date.now() + 3600000;

    // Guardar
    await usuario.save();
    // Generar la URL
    const resetURL = `http://${req.headers.host}/reestablecer-password/${usuario.token}`;
    console.log(resetURL);

    // TODO: Enviar notificacion por email

    req.flash('correcto', 'Revisa tu email para las indicaciones');
    res.redirect('/iniciar-sesion');
};