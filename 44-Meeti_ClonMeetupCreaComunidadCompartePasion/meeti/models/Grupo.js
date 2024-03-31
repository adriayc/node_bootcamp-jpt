const Sequelize = require('sequelize');
const db = require('../config/db');
// const uuid = require('uuid/v4');         // Error!
const {v4: uuid} = require('uuid');
// Models
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');

const Grupo = db.define('grupos', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
    },
    nombre: {
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción es requerida'
            }
        }
    },
    url: Sequelize.TEXT,
    imagen: Sequelize.TEXT
});

// Relacion 1:1 (Un grupo tiene una categoria)
Grupo.belongsTo(Categoria);
// Relacion 1:1 (Un grupo tiene un usuario)
Grupo.belongsTo(Usuario);

// Exportar
module.exports = Grupo;