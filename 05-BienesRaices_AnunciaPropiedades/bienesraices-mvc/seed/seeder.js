import { exit } from 'node:process';
// Seeds
import categorias from './categorias.js';
import precios from './precios.js';
import usuario from './usuarios.js';
// Models
// import Categoria from '../models/Categoria.js';
// import Precio from '../models/Precio.js';
import { Categoria, Precio, Usuario } from '../models/index.js';
// Db's
import db from '../config/db.js';
import usuarios from './usuarios.js';

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate();

        // Generar las columnas
        await db.sync();

        // Insertar los datos
        // await Categoria.bulkCreate(categorias);
        // await Precio.bulkCreate(precios);
        // Usando all promise (No dependen del uno a otro)
        await Promise.all([
            Categoria.bulkCreate(categorias), 
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ]);

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

const eliminarDatos = async () => {
    try {
        // Option #1
        // await Promise.all([
        //     Categoria.destroy({where: {}, truncate: true}),
        //     Precio.destroy({where: {}, truncate: true}),
        // ]);

        // Option #2
        await db.sync({force: true});

        console.log('Datos eliminados correctamente');
        exit();

    } catch (error) {
        console.log(error);
        exit(1);
    }
};

// Validar que argumento en posicion 2 sea igual a '-i' ("db:importar": node ./seed/seeker.js -i")
if (process.argv[2] === '-i') {
    importarDatos();
}

// Eliminar el argumento para eliminar los registros
if (process.argv[2] === '-e') {
    eliminarDatos();
}