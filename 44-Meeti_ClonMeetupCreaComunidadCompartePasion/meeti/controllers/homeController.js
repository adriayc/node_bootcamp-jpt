const Sequelize = require('sequelize');
const moment = require('moment');
// Models
const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');
const Grupo = require('../models/Grupo');
const Meeti = require('../models/Meeti');
// Operadores de sequelize
const Op = Sequelize.Op;

exports.home = async (req, res) => {
    // Usar promise
    const [categorias, meetis] = await Promise.all([
        Categoria.findAll({}),
        Meeti.findAll({
            attributes: ['titulo', 'slug', 'fecha', 'hora'],
            where: {
                fecha: {[Op.gte]: moment(new Date()).format('YYYY-MM-DD')}
            },
            include: [
                {
                    model: Grupo,
                    attributes: ['imagen']
                },
                {
                    model: Usuario,
                    attributes: ['nombre', 'imagen']
                }
            ],
            order: [
                ['fecha', 'DESC'],
                ['hora', 'DESC']
            ],
            limit: 3
        })
    ]);
    // console.log(meetis);

    res.render('home', {
        nombrePagina: 'Inicio',
        categorias,
        meetis
    });
};