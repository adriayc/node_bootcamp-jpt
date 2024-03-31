// Models
const Comentario = require('../../models/Comentario');
const Meeti = require('../../models/Meeti');

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
        res.status(404).send('Acción no valida');
        return next();
    }

    // Obtener la meeti
    const meeti = await Meeti.findOne({where: {id: comentario.meetiId}});

    // Validar que el usuario sea el creado del comentario
    if (comentario.usuarioId === req.user.id || meeti.usuarioId === req.user.id) {
        // Eliminar comentario
        await comentario.destroy();

        res.status(200).send('Se ha eliminando correctamente');
        return next();
    }  else {
        // res.send('No, eres la persona que creo este comentario!');
        res.status(403).send('Acción no valida');
        return next();
    }
};