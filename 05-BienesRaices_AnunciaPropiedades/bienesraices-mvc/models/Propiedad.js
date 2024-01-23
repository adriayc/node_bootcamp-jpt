import { DataTypes } from 'sequelize';
// DBs
import db from '../config/db.js';

const Propiedad = db.define('propiedades', {
    id: {
        // ID simiar al de MongoDB
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});