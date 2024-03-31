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