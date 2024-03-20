// Models
const Usuario = require('../models/Usuario');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu Cuenta'
    });
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;
    // console.log(usuario);

    // req.checkBody('repetir-password', 'El repetir password es requerido').not().empty();
    req.checkBody('repetir-password', 'El repetir password es requerido').notEmpty();
    req.checkBody('repetir-password', 'El password es distinto').equals(req.body.password);

    // Leer los errores de express
    const erroresExpress = req.validationErrors();
    // console.log(erroresExpress);

    try {
        const nuevoUsuario = await Usuario.create(usuario);
        console.log('Usuario creado', nuevoUsuario);
    
        // TODO: Flash message y redireccionar

    } catch (error) {
        // console.log(error);
        // Extraer errores de sequelize
        const erroresSequelize = error.errors.map(err => err.message);
        // console.log(erroresSequelize);

        // Extraer error de express
        const errorExpress = erroresExpress.map(err => err.msg);
        // console.log(errorExpress);

        // Unir los errores
        const listaErrores = [...erroresSequelize, errorExpress];

        // req.flash('error', erroresSequelize);
        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }
};