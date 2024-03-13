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
        req.flash('error', errores.map(error => error.msg));
        // console.log(req.flash());
        // return;

        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        })
        return;
    }

    // Si toda la validacion es correcta
    next();
};

exports.crearUsuario = async (req, res, next) => {
    // console.log(req.body);
    // Crear el usuario
    const usuario = new Usuario(req.body);
    // console.log(usuario);
    // const nuevoUsuario = await usuario.save();

    // if (!nuevoUsuario) return next();

    // res.redirect('/iniciar-sesion');

    try {
        await usuario.save();
        // Redirigir
        res.redirect('/iniciar-sesion');

    } catch (error) {
        // console.log(error);
        // return;
        req.flash('error', error);
        // Redirigir
        // res.redirect('/crear-cuenta');       // Error!

        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        })
        return;
    }
};

// Formulario para iniciar sesion
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión debJobs'
    });
};

// Formulario para editar el perfil
exports.fromEditarPerfil = (req, res) => {
    // console.log(req.user instanceof mongoose.Model);            // true
    // console.log(req.user instanceof mongoose.Document);         // true
    // return;

    res.render('editar-perfil', {
        nombrePagina: 'Editar tu perfil en devJobs',
        // usuario: req.user                           // Error!
        usuario: req.user.toObject()                // Convert document to object
    })
};

// Actualizar cambios del perfil
exports.editarPerfil = async (req, res) => {
    const usuario = await Usuario.findById(req.user._id);
    // console.log(usuario);

    usuario.nombre = req.body.nombre;
    usuario.eamil = req.body.email;
    if (req.body.password) {
        usuario.password = req.body.password;
    }

    await usuario.save();

    req.flash('correcto', 'Cambios guardados correctamente');
    // Redireccionar
    res.redirect('/administracion');
};