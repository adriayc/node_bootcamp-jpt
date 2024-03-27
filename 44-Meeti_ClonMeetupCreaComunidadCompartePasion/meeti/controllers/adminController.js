// Models
const Grupo = require('../models/Grupo');
const Meeti = require('../models/Meeti');

exports.panelAdministracion = async (req, res) => {
    // const grupos = await Grupo.findAll({where: {usuarioId: req.user.id}});
    // Usando promise
    // const consultas = [];
    // consultas.push(Grupo.findAll({where: {usuarioId: req.user.id}}));
    // consultas.push(Meeti.findAll({where: {usuarioId: req.user.id}}));
    // const [grupos, meetis] = await Promise.all(consultas);
    const [grupos, meetis] = await Promise.all([
        Grupo.findAll({where: {usuarioId: req.user.id}}),
        Meeti.findAll({where: {usuarioId: req.user.id}})
    ]);

    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        grupos,
        meetis
    });
};