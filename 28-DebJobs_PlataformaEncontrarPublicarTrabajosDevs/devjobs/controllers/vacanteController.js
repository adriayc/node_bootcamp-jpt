// const mongoose = require('mongoose');
// Models
const Vacante = require('../models/Vacantes');          // OPTION #1
// const Vacante = mongoose.model('Vacante');              // OPTION #2 - Error!

exports.formularioNuevoVacante = (req, res) => {
    // res.send('Formulario nuevo vacante');
    res.render('nueva-vacante', {
        npmbrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante',
        nombre: req.user.nombre,
        cerrarSesion: true,
    });
};

// Validar y sanitizar los campos de las vacantes
exports.validarVacante = (req, res, next) => {
    // Sanitizar los campos
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    // Validar los campos
    // req.checkBody('titulo', 'Agrega un Titulo a la vacante').not().empty();
    req.checkBody('titulo', 'El titulo es requerido').notEmpty();
    req.checkBody('empresa', 'La empresa es requerida').notEmpty();
    req.checkBody('ubicacion', 'La ubicacion es requerida').notEmpty();
    req.checkBody('contrato', 'El contrato es requerido').notEmpty();
    req.checkBody('skills', 'Los skills son requeridos').notEmpty();

    const errores = req.validationErrors();
    // console.log(errores);
    // return;

    // Si existe erroes
    if (errores) {
        req.flash('error', errores.map(error => error.msg));

        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            nombre: req.user.nombre,
            cerrarSesion: true,
            mensajes: req.flash()
        });
        return;
    }

    // Siguiente middleware
    next();
};

// Agrega la vacante a la base de datos
exports.agregarVacante = async (req, res) => {
    // console.log(req.body);

    const vacante = new Vacante(req.body);
    // Agregar el autor al vacante
    vacante.autor = req.user._id;

    // Crear un arreglo de skills (habilidades)
    vacante.skills = req.body.skills.split(',');
    // console.log(vacante);

    // Guardar en la base de datos
    const nuevaVacante = await vacante.save();

    // Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
};

// Mosrar una vacante
exports.mostrarVacante = async (req, res, next) => {
    // const vacante = await Vacante.findOne({url: req.params.url});
    const vacante = await Vacante.findOne({url: req.params.url}).lean();

    // Si no hay resultados
    if (!vacante) return next();

    res.render('vacante', {
        nombrePagina: vacante.titulo,
        barra: true,
        vacante
    })
};

// Editar una vacante
exports.formEditarVacante = async (req, res, next) => {
    // const vacante = await Vacante.findOne({url: req.params.url});
    const vacante = await Vacante.findOne({url: req.params.url}).lean();

    if (!vacante) return next();

    res.render('editar-vacante', {
        nombrePagina: `Editar - ${vacante.titulo}`,
        nombre: req.user.nombre,
        cerrarSesion: true,
        vacante
    });
};

// Guardar editar vacantes
exports.editarVacante = async (req, res) => {
    const vacanteActualizada = req.body;
    vacanteActualizada.skills = req.body.skills.split(',');
    // console.log(vacanteActualizada);

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url}, vacanteActualizada, {
        // Devuelve el documento actualizado
        new: true,
        runValidators: true
    });

    // Redireccionar
    res.redirect(`/vacantes/${vacante.url}`);
};