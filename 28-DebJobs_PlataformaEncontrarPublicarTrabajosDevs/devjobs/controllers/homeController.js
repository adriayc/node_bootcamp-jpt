// Models
const Vacante = require('../models/Vacantes');

exports.mostrarTrabajos = async (req, res, next) => {
    // const vacantes = await Vacante.find();               // Error! al iterar en el template (handlebars)
    const vacantes = await Vacante.find().lean();           // El uso del 'lean()' es recomendado cuando no se modifica el documento
    // console.log(vacantes);
    // return;

    if (!vacantes) return next();

    res.render('home', {
        nombrePagina: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true,
        vacantes
    });
};