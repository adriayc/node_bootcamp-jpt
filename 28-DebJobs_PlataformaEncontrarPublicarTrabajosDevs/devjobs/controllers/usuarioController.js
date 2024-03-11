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

exports.validarRegistro = (req, res, next) => {
    // Sanitizar los valores
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('repetir-password').escape();
    // console.log(req.body);

    // Validar los valores
    req.checkBody('nombre', 'El nombre es obligatorio').notEmpty();
    req.checkBody('email', 'El email debe ser valido').isEmail();
    req.checkBody('password', 'El password es obligatorio').notEmpty();
    req.checkBody('repetir-password', 'Confirmar password es obligatorio').notEmpty();
    req.checkBody('repetir-password', 'El password es diferente').equals(req.body.password);

    const errores = req.validationErrors();
    // console.log(errores);
    // return;

    // Si hay errores
    if (errores) {
        
    }

    // Si toda la validacion es correcta
    next();
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