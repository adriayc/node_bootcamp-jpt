const moment = require('moment');
const Sequelize = require('sequelize');
// Models
const Meeti = require('../../models/Meeti');
const Grupo = require('../../models/Grupo');
const Usuario = require('../../models/Usuario');

exports.mostrarMeeti = async (req, res) => {
    const meeti = await Meeti.findOne({
        where: {slug: req.params.slug},
        include: [
            {
                model: Grupo
            },
            {
                model: Usuario,
                attributes: ['id', 'nombre', 'imagen']
            }
        ]
    });

    // Validar meeti
    if (!meeti) res.redirect('/');

    res.render('mostrar-meeti', {
        nombrePagina: meeti.titulo,
        meeti,
        moment
    });
};

// Confirmar o cancela asistencia a meeti
exports.confirmarAsistencia = (req, res) => {
    // console.log(req.body);
    // return;

    const { accion } = req.body;

    if (accion === 'confirmar') {
        // Agregar usuario
        Meeti.update(
            {interesados: Sequelize.fn('array_append', Sequelize.col('interesados'), req.user.id)},
            {'where': {slug: req.params.slug}}
        );

        // Response
        res.send('Has confirmado tu asistencia');
    } else {
        // Cancelar usuario
        Meeti.update(
            {interesados: Sequelize.fn('array_remove', Sequelize.col('interesados'), req.user.id)},
            {'where': {slug: req.params.slug}}
        );

        // Response
        res.send('Has cancelado tu asistencia');
    }
};

// Muestra el listado de asistentes
exports.mostrarAsistentes = async (req, res) => {
    const meeti = await Meeti.findOne({
        attributes: ['interesados'],
        where: {slug: req.params.slug}
    });
    // console.log(meeti); 

    // Extraer interesados
    const { interesados } = meeti;

    const asistentes = await Usuario.findAll({
        attributes: ['nombre', 'imagen'],
        where: {id: interesados}
    });
    // console.log(asistentes);

    res.render('asistentes-meeti', {
        nombrePagina: 'Listado de Asistentes Meeti',
        asistentes
    });
};