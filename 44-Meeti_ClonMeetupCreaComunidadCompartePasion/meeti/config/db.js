const Sequelize = require('sequelize');
// Dotenv config
require('dotenv').config({path: 'variables.env'});

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    // host: 'localhost',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // define: {
    //     timestamps: false       // No agrega el createdAt y updatedAt       
    // },
    // logging: false              // Desabilitar los logs de la terminal
});