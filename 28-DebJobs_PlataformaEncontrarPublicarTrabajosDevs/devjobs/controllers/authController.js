const passport = require('passport');

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

exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        nombrePagina: 'Panel de Admistración',
        tagline: 'Crear y Adminstra tus vacantes desde aquí'
    });
};