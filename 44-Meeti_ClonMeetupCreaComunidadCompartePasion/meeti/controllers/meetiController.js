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