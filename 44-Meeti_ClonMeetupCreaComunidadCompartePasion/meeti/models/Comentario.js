const Sequelize = require('sequelize');
const db = require('../config/db');
// Models
const Usuario = require('./Usuario');
const Meeti = require('./Meeti');

const Comentario = db.define('comentarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje: Sequelize.TEXT
}, {
    // Deshabilitar el createdAt y updatedAt de la tabla
    timestamps: false
});


// Relacion 1;1 (Un comentario tiene un usuario)
Comentario.belongsTo(Usuario);
// Relacion 1:1 (Un comentario tiene un meeti)
Comentario.belongsTo(Meeti);

module.exports = Comentario;