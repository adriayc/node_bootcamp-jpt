const bscrypt = require('bcrypt');
// Models
const Usuario = require('../models/Usuario');

// Crear nuevo usuario
exports.registrarUsuario = async (req, res) => {
    // Crear una instancia de usuario
    const usuario = new Usuario(req.body);
    // Hash del password
    usuario.password = await bscrypt.hash(req.body.password, 12);

    try {
        // Guardar en la DB
        await usuario.save();

        // Devolver una respuesta
        res.json({'mensaje': 'El usuario ha sido creado correctamente'});

    } catch (error) {
        console.log(error);
        // Devolver una respuesta
        res.json({'mensaje': 'Hubo un error'});
    }
};

// Autenticar un usuario
exports.autenticarUsuario = () => {

};
