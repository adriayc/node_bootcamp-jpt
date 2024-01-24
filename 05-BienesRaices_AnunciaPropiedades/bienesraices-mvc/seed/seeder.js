import { exit } from 'node:process';
// Seeds
import categorias from './categorias.js';
// Models
import Categoria from '../models/Categoria.js';
// Db's
import db from '../config/db.js';

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate();

        // Generar las columnas
        await db.sync();

        // Insertar los datos
        await Categoria.bulkCreate(categorias);
        console.log('Datos importados correctamente');
        exit();
        // exit(0);        // 0 - Finalizo correctamente
        
    } catch (error) {
        console.log(error);
        // Finalizar el proceso
        // process.exit(1);
        // Solo node.js
        exit(1);        // 1 - Finalizo incorrectamente
    }
};

// Validar que argumento en posicion 2 sea igual a '-i' ("db:importar": node ./seed/seeker.js -i")
if (process.argv[2] === '-i') {
    importarDatos();
}