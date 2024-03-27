// Models
const { eq } = require('lodash');
const Grupo = require('../models/Grupo'); 
const Meeti = require('../models/Meeti');

// Formulario para nuevas meeti
exports.formNuevoMeeti = async (req, res) => {
    const grupos = await Grupo.findAll({where: {usuarioId: req.user.id}});

    res.render('nuevo-meeti', {
        nombrePagina: 'Crear Nuevo Meeti',
        grupos
    });
};

// Sanitizar los meeti
exports.sanitizarMeeti = (req, res, next) => {
    req.sanitizeBody('titulo');
    req.sanitizeBody('invitado');
    req.sanitizeBody('cupo');
    req.sanitizeBody('descripcion');
    req.sanitizeBody('fecha');
    req.sanitizeBody('hora');
    req.sanitizeBody('direccion');
    req.sanitizeBody('cuidad');
    req.sanitizeBody('estado');
    req.sanitizeBody('pais');
    req.sanitizeBody('lat');
    req.sanitizeBody('lnt');
    req.sanitizeBody('grupoId');

    // Ir al siguiente middleware
    next();
};

// Crear un nuevo meeti
exports.crearMeeti = async (req, res) => {
    // Obtener los datos
    const meeti = req.body;
    // console.log(meeti);

    // Asignar el usuario
    meeti.usuarioId = req.user.id;
    // Asignar la ubicacioon con un point
    const point = {type: 'Point', coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lng)]};
    meeti.ubicacion = point;

    // Validar cupo
    if (req.body.cupo === '') {
        meeti.cupo = 0;
    }
    // console.log(meeti);

    try {
        // Almacenar en la DB
        await Meeti.create(meeti);

        req.flash('exito', 'Se ha creado el meeti correctamente');
        // Redireccionar
        res.redirect('/administracion');

    } catch (error) {
        // console.log(error);

        // Extraer el mensaje de los errores
        const erroresSequelize = error.errors.map(err => err.message);

        // req.flash('error', error);
        req.flash('error', erroresSequelize);
        // Redireccionar
        res.redirect('/nuevo-meeti');
    }
};

// Formulario para editar meeti
exports.formEditarMeeti = async (req, res, next) => {
    // const consultas = [];
    // consultas.push(Meeti.findByPk(req.params.id));
    // consultas.push(Grupo.findAll({where: {usuarioId: req.user.id}}));
    // const [meeti, grupos] = await Promise.all(consultas);
    const [meeti, grupos] = await Promise.all([
        Meeti.findByPk(req.params.id),
        Grupo.findAll({where: {usuarioId: req.user.id}})
    ]);

    // 
    if (!meeti || !grupos) {
        res.flash('error', 'Operación no valida');
        // Redireccionar
        res.redirect('/administracion');
        return next();
    }

    // Vista
    res.render('editar-meeti', {
        nombrePagina: `Editar Meeti: ${meeti.titulo}`,
        meeti,
        grupos
    })
};

// Guardar el meeti actualizado en la DB
exports.editarMeeti = async (req, res, next) => {
    // console.log(req.body);

    const meeti = await Meeti.findOne({where: {id: req.params.id, usuarioId: req.user.id}});

    if (!meeti) {
        req.flash('error', 'Operación no valida');
        // Redireccionar
        res.redirect('/administracion');
        return next();
    }

    // Asignar los valores
    const {titulo, invitado, fecha, hora, cupo, descripcion, direccion, ciudad, estado, pais, lat, lng, grupoId} = req.body;

    meeti.titulo = titulo;
    meeti.invitado = invitado;
    meeti.fecha = fecha;
    meeti.hora = hora;
    meeti.cupo = cupo;
    meeti.descripcion = descripcion;
    meeti.direccion = direccion;
    meeti.ciudad = ciudad;
    meeti.estado = estado;
    meeti.pais = pais;
    meeti.grupoId = grupoId;

    // Asignar point (Ubicacion)
    const point = {type: 'Point', coordinates: [parseFloat(lat), parseFloat(lng)]};
    meeti.ubicacion = point;

    // Guarde en la DB
    await meeti.save();

    req.flash('exito', 'Se ha actualizado correctamente');
    // Redireccionar
    res.redirect('/administracion');
};

// Formulario para eliminar una meeti
exports.formEliminarMeeti = async (req, res, next) => {
    const meeti = await Meeti.findOne({where: {id: req.params.id, usuarioId: req.user.id}});

    if (!meeti) {
        req.flash('error', 'Operación no valida');
        // Redireccionar
        res.redirect('/administracion');
        return next();
    }

    res.render('eliminar-meeti', {
        nombrePagina: `Eliminar Meeti: ${meeti.titulo}`
    });
};