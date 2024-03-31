const Sequelize = require('sequelize');
const moment = require('moment');
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

    // Validar categoria
    let query;
    if (categoria === '') {
        query = '';
    } else {
        query = `
            where: {
                categoriaId: {[Op.eq]: ${categoria}}
            }
        `;
    }

    // Filstrar los meeti's por los terminos de busqueda
    const meetis = await Meeti.findAll({
        include: [
            {
                model: Grupo,
                // where: {
                //     categoriaId: {[Op.eq]: categoria}
                // }
                query
            },
            {
                attributes: ['id', 'nombre', 'imagen'],
                model: Usuario,
            }
        ],
        where: {
            titulo: {[Op.iLike]: '%'+ titulo +'%'}, 
            ciudad: {[Op.iLike]: '%'+ ciudad +'%'}, 
            pais: {[Op.iLike]: '%'+ pais +'%'}
        }
    });

    res.render('busqueda', {
       nombrePagina: 'Resultados Búsquedas',
       meetis,
       moment
    });
};