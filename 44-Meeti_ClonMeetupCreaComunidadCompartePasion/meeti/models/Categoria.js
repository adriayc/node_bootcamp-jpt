const Sequelize = require('sequelize');
const db = require('../config/db');

const Categoria = db.define('categorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.TEXT,
    slug: Sequelize.TEXT
}, {
    timestamps: false               // No agregar el createdAt y updatedAt a la tabla
});

// Exportar
module.exports = Categoria;