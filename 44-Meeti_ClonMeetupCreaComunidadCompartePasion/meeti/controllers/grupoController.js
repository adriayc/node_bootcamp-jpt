// Models
const Categoria = require('../models/Categoria');
const Grupo = require('../models/Grupo');

exports.formNuevoGrupo = async (req, res) => {
    const categorias = await Categoria.findAll();
    // console.log(categorias);
    // return;

    res.render('nuevo-grupo', {
        nombrePagina: 'Crear un nuevo grupo',
        categorias
    });
};

// Guardar el grupo en la DB
exports.crearGrupo = async (req, res) => {
    const grupo = req.body;
    // console.log(grupo); return;

    try {
        // Almacenar el DB
        await Grupo.create(grupo);

        req.flash('exito', 'Se ha creardo el grupo correctamente');
        // Redireccionar
        res.redirect('/administracion');

    } catch (error) {
        console.log(error);

        req.flash('error', error);
        // Redireccionar
        res.redirect('/nuevo-grupo');
    }
};