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
    // Sanitizar los campos
    req.sanitizeBody('nombre');
    req.sanitizeBody('url');

    const grupo = req.body;
    // console.log(grupo); return;

    // Almacena ID del usuario autenticado como creardor del grupo
    grupo.usuarioId = req.user.id;
    // Almacenar ID de la categoria
    // grupo.categoriaId = req.body.Categoria;

    // console.log(grupo); return;

    try {
        // Almacenar el DB
        await Grupo.create(grupo);

        req.flash('exito', 'Se ha creardo el grupo correctamente');
        // Redireccionar
        res.redirect('/administracion');

    } catch (error) {
        // console.log(error);

        // Extraer los error de sequelize
        const erroresSequelize = error.error.map(err => err.message);

        // req.flash('error', error);
        req.flash('error', erroresSequelize);
        // Redireccionar
        res.redirect('/nuevo-grupo');
    }
};