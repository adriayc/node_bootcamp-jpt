const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// Models
// const Usuario = mongoose.model('Usuarios'); 
const Usuario = require('../models/Usuarios'); 

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const usuario = await Usuario.findOne({email});
    
    if (!usuario) return done(null, false, {
        message: 'El usuario no existe'
    });

    // El usuario existe, verficamos el password
    const verificarPassword = usuario.compararPassword(password);

    if (!verificarPassword) return done(null, false, {
        message: 'El password es incorrecto'
    });

    // El usuario existe y el password es correcto
    return done(null, usuario)
}));

// Serialize
passport.serializeUser((usuario, done) => done(null, usuario._id));

// Deserialize
passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.findById(id).exec();
    
    return done(null, usuario);
});

module.exports = passport;