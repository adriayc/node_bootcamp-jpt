// const mongoose = require('mongoose');
// Models
// const Usuario = mongoose.model('Usuarios');
const Usuario = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en debJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
};

exports.crearUsuario = async (req, res, next) => {
    // console.log(req.body);
    // Crear el usuario
    const usuario = new Usuario(req.body);
    // console.log(usuario);
    const nuevoUsuario = await usuario.save();

    // if (!nuevoUsuario) return next();

    res.redirect('/iniciar-sesion');
};