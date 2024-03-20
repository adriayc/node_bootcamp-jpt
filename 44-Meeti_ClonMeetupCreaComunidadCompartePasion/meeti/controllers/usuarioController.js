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

    try {
        const nuevoUsuario = await Usuario.create(usuario);
        console.log('Usuario creado', nuevoUsuario);
    
        // TODO: Flash message y redireccionar

    } catch (error) {
        console.log(error);
    }
};