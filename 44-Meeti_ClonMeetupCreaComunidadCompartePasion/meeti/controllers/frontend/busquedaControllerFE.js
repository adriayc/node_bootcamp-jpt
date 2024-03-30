const Sequelize = require('sequelize');
const momento = require('moment');
// Models
const Meeti = require('../../models/Meeti');
const Grupo = require('../../models/Grupo');
const Usuario = require('../../models/Usuario');

// Operaciones sequelize
const Op = Sequelize.Op;

exports.resultadosBusqueda = async (req, res) => {
    // console.log(req.query);

    // Leer datos de la URL
    const {categoria, titulo, ciudad, pais} = req.query;

    // Filstrar los meeti's por los terminos de busqueda
    const meetis = await Meeti.findAll({
        where: {}
    });
};