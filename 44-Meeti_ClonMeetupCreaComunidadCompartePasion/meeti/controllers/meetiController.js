// Models
const Grupo = require('../models/Grupo'); 

// Formulario para nuevas meeti
exports.formNuevoMeeti = async (req, res) => {
    const grupos = await Grupo.findAll({where: {usuarioId: req.user.id}});

    res.render('nuevo-meeti', {
        nombrePagina: 'Crear Nuevo Meeti',
        grupos
    });
};