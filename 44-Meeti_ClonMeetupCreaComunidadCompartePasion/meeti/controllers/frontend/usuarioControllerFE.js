// Models
const Usuario = require('../../models/Usuario');
const Grupo = require('../../models/Grupo');

// Mostrar el perfil en el frontend 
exports.mostrarUsuario = async (req, res, next) => {
    // console.log(req.params.id);

    const [usuario, grupos] = await Promise.all([
        Usuario.findOne({where: {id: req.params.id}}),
        Grupo.findAll({where: {usuarioId: req.params.id}})
    ]);
    // console.log(usuario);

    // Validar
    if (!usuario) {
        // Redireccionar
        res.redirect('/');
        return next();
    }

    res.render('mostrar-perfil', {
        nombrePagina: `Perfil Usuario: ${usuario.nombre}`,
        usuario,
        grupos
    });
};