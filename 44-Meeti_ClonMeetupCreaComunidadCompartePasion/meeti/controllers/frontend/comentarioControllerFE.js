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
exports.eliminarComentario = async (req, res, next) => {
    // res.send('Eliminando...');

    // Obtener el ID del comentario
    const { comentarioId } = req.body;

    // Obtener el comentario
    const comentario = await Comentario.findOne({where: {id: comentarioId}});
    // console.log(comentario);

    // Validar que exista el comentario
    if (!comentario) {
        res.send('Acción no valida');
        return next();
    }

    // Validar que el usuario sea el creado del comentario
    if (comentario.usuarioId === req.user.id) {
        res.send('Si, eres la persona que creo este comentario');
        return next();
    }  else {
        res.send('No, eres la persona que creo este comentario!');
        return next();
    }
};