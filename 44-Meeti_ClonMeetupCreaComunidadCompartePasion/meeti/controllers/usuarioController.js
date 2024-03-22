// Models
const Usuario = require('../models/Usuario');
// E-mail config
const enviarEmail = require('../handlers/emails');

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
        // const nuevoUsuario = await Usuario.create(usuario);
        await Usuario.create(usuario);
        // console.log('Usuario creado', nuevoUsuario);

        // Generar URL de confirmacion
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        // Enviar email de confirmacion
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        });
    
        // Flash message y redireccionar
        req.flash('exito', 'Hemos enviando un E-mail, confirma tu cuenta');
        res.redirect('/iniciar-sesion');

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

// Confirmar la cuenta del usuario
exports.confirmarCuenta = async (req, res, next) => {
    // console.log(req.params.correo);

    // Verificar que el usuario exista
    const usuario = await Usuario.findOne({where: {email: req.params.correo}});
    // console.log(usuario);
    
    // Si no existe, redireccionar
    if (!usuario) {
        req.flash('error', 'No existe la cuenta');
        res.redirect('/crear-cuenta');
        return next();
    }

    // Si existe, confirmar suscripcion y redireccionar
    usuario.activo = true;
    await usuario.save();

    req.flash('exito', 'La cuenta se ha confirmado correctamente, ya puedes iniciar sesión');
    res.redirect('/iniciar-sesion');
};

exports.formIniciarSesion = (req, res) => {
    res.render('inciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    });
};