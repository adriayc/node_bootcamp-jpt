import { DataTypes } from 'sequelize';
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
});

export default Usuario;