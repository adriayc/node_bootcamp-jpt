const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Models
const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, next) => {
    // Codigo que se ejecuta al llenar el formulario
    const usuario = await Usuario.findOne({where: {email}});

    // Validar el usuario
    if (!usuario) return next(null, false, {
        message: 'El usuario no existe'
    })

    // El usuario existe, comprar su password
    const verificarPassword = usuario.validarPassword(password);

    // Validar el password
    if (!verificarPassword) return next(null, false, {
        message: 'El password es incorrecto'
    });

    // Si todo es Ok
    return next(null, usuario);
}));

// Serializar
passport.serializeUser(function (usuario, cb) {
    cb(null, usuario);
});
// Deserializar
passport.deserializeUser(function (usuario, cb) {
    cb(null, usuario);
});

// Exportar passport
module.exports = passport;