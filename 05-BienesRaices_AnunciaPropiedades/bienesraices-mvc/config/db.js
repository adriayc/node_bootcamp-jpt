import { Sequelize } from 'sequelize';
// Dotenv
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

// console.log(process);
// console.log(process.env.DB_NOMBRE);
const db = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,         // Maximo de conexiones
        min: 0,         // Minimo de conexiones
        acquire: 30000, // Tiempo antes de marcar un error
        idle: 10000     // Tiempo que debe transcurrir para finalizar la conexion (liberar espacio)
    },
    // operatorsAliases: false      // NOTE: Deprecado!
});

export default db;
