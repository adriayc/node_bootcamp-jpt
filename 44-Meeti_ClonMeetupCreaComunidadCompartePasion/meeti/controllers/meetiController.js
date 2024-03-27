// Models
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