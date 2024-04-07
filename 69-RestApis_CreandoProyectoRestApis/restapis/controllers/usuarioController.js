const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
exports.autenticarUsuario = async (req, res, next) => {
    // Obtener el email
    const { email, password } = req.body;

    try {
      // Obtener un usuario
      const usuario = await Usuario.findOne({email});

      // Validar el usuario
      if (!usuario) {
        // Devolver una respuesta
        res.status(401).json({'mensaje': 'El usuario no exite'});
        return next();
      }

      // Validar el password
      if (!bcrypt.compareSync(password, usuario.password)) {
        // Devolver una respuesta
        res.status(401).json({'mensaje': 'El password es incorrecto'});
        return next();
      }

      // Crear un token con JWT
      const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        _id: usuario._id
      },
      // Llave secreta
      'LLAVESECRETA',
      {
        // Expiracion del token
        expiresIn: '1h'
      });

      res.json({token});

    } catch (error) {
      console.log(error);
      res.send(error);
    }

};
