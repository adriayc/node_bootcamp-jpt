const passport = require('passport');

// exports.autenticarUsuario = (req, res) => {
//     console.log('Autenticando...');
// };
exports.autenticarUsuario = passport.authenticate('local', {
    // successRedirect: '/ok',
    // failureRedirect: '/fail'
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'El email y password son obligatorios'
});

// Verificar si el usuario esta autenticado
exports.usuarioAutenticado = (req, res, next) => {
    // Revisar si el usuario esta autenticado (isAutenticated metodo de passport)
    if (req.isAuthenticated()) {
        return next();
    }
    
    // Si no esta autenticado
    res.redirect('/iniciar-sesion');
};

// Cerrar sesion
exports.cerrarSesion = (req, res, next) => {
    // Cerrar sesion
    // req.logout();            // Error
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('exito', 'Se ha cerrado sesión correctamente');
        // Redireccionar
        res.redirect('/iniciar-sesion');
        next();
    });

    // req.flash('exito', 'Se ha cerrado sesión correctamente');
    // // Redireccionar
    // res.redirect('/iniciar-sesion');
    // next();
};