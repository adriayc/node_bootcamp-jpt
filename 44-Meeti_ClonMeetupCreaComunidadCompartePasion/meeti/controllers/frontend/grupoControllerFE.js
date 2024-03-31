const moment = require('moment');
// Models
const Grupo = require('../../models/Grupo');
const Meeti = require('../../models/Meeti');

// Mostrar el grupo en el frontend
exports.mostrarGrupo = async (req, res, next) => {
    const [grupo, meetis] = await Promise.all([
        Grupo.findOne({where: {id: req.params.id}}),
        Meeti.findAll({
            where: {grupoId: req.params.id},
            order: [
                ['fecha', 'ASC'],
                ['hora', 'ASC']
            ]
        })
    ]);

    // Validar grupo
    if (!grupo) {
        // Redireccionar
        res.redirect('/');
        return next();
    }
    
    res.render('mostrar-grupo', {
        nombrePagina: `Información Grupo: ${grupo.nombre}`,
        grupo,
        meetis,
        moment
    });
};