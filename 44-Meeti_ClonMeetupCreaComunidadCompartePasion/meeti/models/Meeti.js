const Sequelize = require('sequelize');
const db = require('../config/db');
// const uuid = require('uuid/v4');        // Error!
const {v4: uuid} = require('uuid');
const slug = require('slug');
const shortid = require('shortid');
// Models
const Usuario = require('../models/Usuario');
const Grupo = require('../models/Grupo');

const Meeti = db.define('meetis', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El titulo es requerido'
            }
        }
    },
    slug: {
        type: Sequelize.STRING
    },
    invitado: Sequelize.STRING,
    cupo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripcion es requerida'
            }
        }
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La fecha es requerida'
            }
        }
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La hora es requerida'
            }
        }
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La dirección es requerida'
            }
        }
    },
    ciudad: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La cuidad es requerida'
            }
        }
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El estado es requerido'
            }
        }
    },
    pais: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El país es requerido'
            }
        }
    },
    ubicacion: {
        type: Sequelize.GEOMETRY('POINT')
    },
    interesados: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    }
}, {
    hooks: {
        async beforeCreate(meeti) {
            const url = slug(meeti.titulo).toLowerCase();
            // Asignar el valor a slug
            meeti.slug = `${url}-${shortid.generate()}`;
        }
    }
});

// Relacion 1;1 (Una meeti tiene un usuario)
Meeti.belongsTo(Usuario);
// Relacion 1:1 (Una meeti tiene un grupo)
Meeti.belongsTo(Grupo);

// Exportar
module.exports = Meeti;