// Models
const Categoria = require('../models/Categoria');

exports.home = async (req, res) => {
    // Usar promise
    const [categorias] = await Promise.all([
        Categoria.findAll({})
    ]);

    res.render('home', {
        nombrePagina: 'Inicio',
        categorias
    });
};