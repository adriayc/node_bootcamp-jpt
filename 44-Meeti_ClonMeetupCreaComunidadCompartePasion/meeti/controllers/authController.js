const passport = require('passport');

// exports.autenticarUsuario = (req, res) => {
//     console.log('Autenticando...');
// };
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/ok',
    failureRedirect: '/fail'
});