const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Definir el modelo
const Usuario = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    imagen: Sequelize.STRING(60),
    descripcion: Sequelize.TEXT,
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: {msg: 'El email no es válido'}
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {msg: 'El password es requerido'}
        }
    },
    activo: {
        // type: Sequelize.INTEGER,
        // defaultValue: 0,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    tokenPassword: Sequelize.STRING,
    expiraToken: Sequelize.DATE
}, {
    hooks: {
        // Se ejecuta antes de guardar
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null);
        }
    }
});

// Método para comparar los password
Usuario.prototype.validarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Exportar
module.exports = Usuario;