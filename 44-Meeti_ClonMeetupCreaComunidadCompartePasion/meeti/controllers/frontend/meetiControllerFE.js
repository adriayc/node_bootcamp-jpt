const moment = require('moment');
const Sequelize = require('sequelize');
// Models
const Meeti = require('../../models/Meeti');
const Grupo = require('../../models/Grupo');
const Usuario = require('../../models/Usuario');
const Categoria = require('../../models/Categoria');
const Comentario = require('../../models/Comentario');

// Operadores de sequlize
const Op = Sequelize.Op;

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

    // Trabajando con la ubicacion (Sequelize.GEOMETRY('POINT'))
    // ST-GeomFromText - obtiene la ubicacion de la lat y lng
    const ubicacion = Sequelize.literal(`ST_GeomFromText('POINT(${meeti.ubicacion.coordinates[0]} ${meeti.ubicacion.coordinates[1]})')`);
    // console.log(ubicacion);

    // ST_Distance_Sphere - retorna una linea en metros
    // const distancia = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('ubicacion'), ubicacion);    // Error!
    const distancia = Sequelize.fn('ST_DistanceSphere', Sequelize.col('ubicacion'), ubicacion);
    // console.log(distancia);

    // Obtener los 3 meeti's mas cercanos
    const meetisCercanos = await Meeti.findAll({
        include: [
            {
                model: Grupo
            },
            {
                model: Usuario,
                attributes: ['id', 'nombre', 'imagen']
            }
        ],
        // Donde la distancia sea menor o igual a 2Km
        where: Sequelize.where(distancia, {[Op.lte]: 2000}),            // 2000mt igual 2km
        // Ordena del mas cercano a lejano
        order: distancia,
        // A partir del 1er registro (Ignorar el 1 registro)
        offset: 1,
        limit: 3
    });
    // console.log(meetisCercanos);

    // Obtener todas los comentarios de la meeti (Despues de validar la meeti)
    const comentarios = await Comentario.findAll({
        where: {meetiId: meeti.id},
        include: [
            {
                model: Usuario,
                attributes: ['id', 'nombre', 'imagen']
            }
        ]
    });

    res.render('mostrar-meeti', {
        nombrePagina: meeti.titulo,
        meeti,
        comentarios,
        meetisCercanos,
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
        nombrePagina: 'Listado Asistentes Meeti',
        asistentes
    });
};

// Mostrar la categoria y sus meeti's
exports.mostrarCategoria = async (req, res, next) => {
    const categoria = await Categoria.findOne({
        attributes: ['id', 'nombre'],
        where: {slug: req.params.slug}
    });
    const meetis = await Meeti.findAll({
        include: [
            {
                model: Grupo,
                where: {categoriaId: categoria.id}
            },
            {
                model: Usuario
            }
        ],
        order: [
            ['fecha', 'ASC'],
            ['hora', 'ASC']
        ]
    })
    // console.log(categoria.id);

    res.render('categoria', {
        nombrePagina: `Categoria: ${categoria.nombre}`,
        // categoria,
        meetis,
        moment
    });
};