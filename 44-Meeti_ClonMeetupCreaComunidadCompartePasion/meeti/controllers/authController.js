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