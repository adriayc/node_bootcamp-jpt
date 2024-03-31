const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Moment.js
const moment = require('moment');
// Models
const Grupo = require('../models/Grupo');
const Meeti = require('../models/Meeti');

exports.panelAdministracion = async (req, res) => {
    // console.log(new Date());
    // console.log(moment(new Date()).format('YYYY-MM-DD'));

    // const grupos = await Grupo.findAll({where: {usuarioId: req.user.id}});
    // Usando promise
    // const consultas = [];
    // consultas.push(Grupo.findAll({where: {usuarioId: req.user.id}}));
    // consultas.push(Meeti.findAll({where: {usuarioId: req.user.id}}));
    // const [grupos, meetis] = await Promise.all(consultas);
    const [grupos, meetis, meetisAnteriores] = await Promise.all([
        Grupo.findAll({where: {usuarioId: req.user.id}}),
        Meeti.findAll({
            where: {
                usuarioId: req.user.id,
                fecha: {[Op.gte]: moment(new Date()).format('YYYY-MM-DD')}
            },
            order: [
                ['fecha', 'DESC'],
                ['hora', 'DESC']
            ]
        }),
        Meeti.findAll({
            where: {
                usuarioId: req.user.id,
                fecha: {[Op.lt]: moment(new Date()).format('YYYY-MM-DD')}
            },
            order: [
                ['fecha', 'DESC'],
                ['hora', 'DESC']
            ]
        })
    ]);

    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        grupos,
        meetis,
        meetisAnteriores,
        moment
    });
};