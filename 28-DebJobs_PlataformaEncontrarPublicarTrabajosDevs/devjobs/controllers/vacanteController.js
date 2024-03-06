// const mongoose = require('mongoose');
// Models
const Vacante = require('../models/Vacantes');          // OPTION #1
// const Vacante = mongoose.model('Vacante');              // OPTION #2 - Error!

exports.formularioNuevoVacante = (req, res) => {
    // res.send('Formulario nuevo vacante');
    res.render('nueva-vacante', {
        npmbrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
};

// Agrega la vacante a la base de datos
exports.agregarVacante = async (req, res) => {
    console.log(req.body);

    const vacante = new Vacante(req.body);
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