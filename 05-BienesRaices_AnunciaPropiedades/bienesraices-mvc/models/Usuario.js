import { DataTypes } from 'sequelize';
// BCrypt
import bcrypt from 'bcrypt';
// DBs
import db from '../config/db.js';

// Definimos el nombre de la tabla y sus atributos
const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    // token: { type: DataTypes.STRING }
    confirmado: DataTypes.BOOLEAN
}, {
    // Hooks
    hooks: {
        // Crear el hook beforeCreate antes de crear el usuario
        beforeCreate: async function (usuario) {
            // Hasheo del password
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    },
    // Scopes
    scopes: {
        // Excluir atributos de las consultas
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
});

// Métodos personalizados
Usuario.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default Usuario;