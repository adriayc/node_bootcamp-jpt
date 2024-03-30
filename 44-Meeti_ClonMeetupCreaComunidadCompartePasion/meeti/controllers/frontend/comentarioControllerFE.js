// Models
const Comentario = require('../../models/Comentario');

// Guardar los comentarios
exports.agregarComentario = async (req, res, next) => {
    // console.log(req.body);
    const { comentario } = req.body;

    await Comentario.create({
        mensaje: comentario,
        usuarioId: req.user.id,
        meetiId: req.params.id
    });

    // Redireccionar (A la pagina anterior)
    res.redirect('back');
    next();
};

// Eliminar comentario
exports.eliminarComentario = (req, res, next) => {
    res.send('Eliminando...');
};