// Models
const Grupo = require('../models/Grupo');

exports.panelAdministracion = async (req, res) => {
    const grupos = await Grupo.findAll({where: {usuarioId: req.user.id}});

    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        grupos
    });
};