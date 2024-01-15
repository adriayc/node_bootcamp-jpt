import { Sequelize } from 'sequelize';

const db = new Sequelize('bienesraices_node_app', 'root', 'root123', {
    host: 'localhost',
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
    operatorsAliases: false
});

export default db;
