import { validationResult } from 'express-validator';
// Models
// import Categoria from '../models/Categoria.js';
// import Precio from '../models/Precio.js';
import { Categoria, Precio, Propiedad } from '../models/index.js';

const admin = (req, res) => {
    // res.send('Mis propiedades...');

    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    });
};

// Formulario para crear una nueva propiedad
const crear = async (req, res) => {
    // Consultar el modelo de Categorias y Precio
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    });
};

const guardar = async (req, res) => {
    // Agregar el resultado de la validacion en una variable 
    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {
        // Consultar el modelo de Categorias y Precio
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ]);

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        });
    }

    // Crear un registro
    // console.log(req.body);
    // const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, categoria, precio } = req.body;
    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body;

    // Accediendo al usuario desde el req
    // console.log(req.usuario.id);
    // return;
    const { id: usuarioId } = req.usuario;

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            imagen: '',
            // precioId: precio,
            precioId,
            // categoriaId: categoria,
            categoriaId,
            // usuarioId: req.usuario.id
            usuarioId
        });

        const { id } = propiedadGuardada;

        // Redirigir
        res.redirect('/propiedades/agregar-imagen/${id}');
        
    } catch (error) {
        console.log(error);
    }

};

export {
    admin,
    crear,
    guardar
};