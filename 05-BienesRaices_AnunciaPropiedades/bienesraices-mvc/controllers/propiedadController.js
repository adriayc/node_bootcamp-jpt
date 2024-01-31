import { validationResult } from 'express-validator';
// Models
// import Categoria from '../models/Categoria.js';
// import Precio from '../models/Precio.js';
import { Categoria, Precio, Propiedad } from '../models/index.js';

const admin = async (req, res) => {
    // res.send('Mis propiedades...');

    const { id } = req.usuario;
    // console.log(id);

    const propiedades = await Propiedad.findAll({
        where: { usuarioId: id },
        // JOIN (Cruzar multiples modelos)
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    });
    // console.log(propiedades);

    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        propiedades
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

const agregarImagen = async (req, res) => {
    // res.send('Agregando imagen...');
    const { id } = req.params; 

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    // Validar que la propiedad no este publicada
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades');
    }

    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.usuario.id);
    // console.log(typeof req.usuario.id.toString());
    // console.log(propiedad.usuarioId);
    // console.log(typeof propiedad.usuarioId.toString());
    if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
        return res.redirect('/mis-propiedades');
    }

    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    });
};

const almacenarImagen = async (req, res, next) => {
    const { id } = req.params; 

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    // Validar que la propiedad no este publicada
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades');
    }

    try {
        // console.log(req.file.filename);

        // Almacenar la imagen y publicar la propiedad
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1;

        // Guardar los cambios de la propiedad
        await propiedad.save();

        // Redirigir a una pagina
        // return res.redirect('/mis-propiedades');     // Error, no funciona la redireccion

        // Redirige al siguiente middleware
        next();

    } catch (error) {
        console.log(error);
    }
};

const editar = async (req, res) => {
    // console.log(req.params);

    // Consultar Modelo de Precio y Categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    res.render('propiedades/editar', {
        pagina: 'Editar Propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    });
};

export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar
};