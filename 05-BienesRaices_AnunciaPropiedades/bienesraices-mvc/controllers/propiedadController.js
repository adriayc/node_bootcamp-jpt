import { unlink } from 'node:fs/promises';      // Funcion propia de node.js para eliminar archivos
import { body, validationResult } from 'express-validator';
// Models
// import Categoria from '../models/Categoria.js';
// import Precio from '../models/Precio.js';
import { Categoria, Precio, Propiedad } from '../models/index.js';

const admin = async (req, res) => {
    // res.send('Mis propiedades...');

    // Leer QueryString de la URL (http://localhost:3000/mis-propiedades?pagina=1)
    // console.log(req.query.pagina);
    const { pagina: paginaActual } = req.query;

    // Definimos una expresion regular
    // const expresion = /^[0-9]$/;
    const expresion = /^[1-9]$/;
    // Validar que no se cumpla la expresion regular
    if (!expresion.test(paginaActual)) {
        return res.redirect('/mis-propiedades?pagina=1');
    }

    try {
        const { id } = req.usuario;
        // console.log(id);

        // Limites y Offset para el paginador
        const limit = 10;
        // const limit = 5;
        const offset = ((paginaActual * limit) - limit);
    
        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
                // limit: limit,
                limit,
                offset,
                where: { usuarioId: id },
                // JOIN (Cruzar multiples modelos)
                include: [
                    {model: Categoria, as: 'categoria'},
                    {model: Precio, as: 'precio'}
                ]
            }),
            Propiedad.count({
                where: { usuarioId: id }
            })
        ]);
        // console.log(propiedades);
        // console.log(total);
    
        res.render('propiedades/admin', {
            pagina: 'Mis Propiedades',
            csrfToken: req.csrfToken(),
            propiedades,
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit
        });

    } catch (error) {
        console.log(error);
    }
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
        res.redirect(`/propiedades/agregar-imagen/${id}`);
        
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
    const { id } = req.params;

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    //  Revisar que quien visita la URL, es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    // Consultar Modelo de Precio y Categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    res.render('propiedades/editar', {
        pagina: `Editar Propiedad: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    });
};

const guardarCambios = async (req, res) => {
    // console.log('Guardando cambios...');
    console.log(req.body);


    // Validacion
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        // Consultar el Modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ]);

        const {titulo, descripcion, categoria: categoriaId, precio: precioId, habitaciones, estacionamiento, wc, calle, lat, lng } = req.body;
        // console.log(datos);

        return res.render('propiedades/editar', {
            pagina: 'Editar Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            // datos: req.body   // Error con los nombre de los valore de categoria y precio   
            datos: {
                titulo,
                descripcion,
                categoriaId,
                precioId,
                habitaciones,
                estacionamiento,
                wc,
                calle,
                lat,
                lng
            }
        });
    }

    const { id } = req.params;

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    // Revisar que quien visita la URL, es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    // Reescribir el objeto y actualizarlo
    // console.log(propiedad);

    try {
        const {titulo, descripcion, categoria: categoriaId, precio: precioId, habitaciones, estacionamiento, wc, calle, lat, lng } = req.body;

        propiedad.set({
            titulo,
            descripcion,
            categoriaId,
            precioId,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng
        });

        await propiedad.save();

        res.redirect('/mis-propiedades');

    } catch (error) {
        console.log(error);
    }
};

const eliminar = async (req, res) => {
    // console.log('Eliminando...');

    const { id } = req.params;
    
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    
    if (!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    // Revisar que quien visita la URL, es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    // Eliminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`);
    console.log(`Se eliminó la imagen ${propiedad.imagen}`);

    // Eliminar la propiedad
    await propiedad.destroy();

    res.redirect('/mis-propiedades');
};

// Mostrar una propiedad
const mostrarPropiedad = async (req, res) => {
    // console.log(req.usuario);

    const { id } = req.params;

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id, {include: [
        {model: Categoria, as: 'categoria'},
        {model: Precio, as: 'precio'}
    ]});

    if (!propiedad) {
        return res.redirect('/404');
    }

    res.render('propiedades/mostrar', {
        pagina: propiedad.titulo,
        csrfToken: req.csrfToken(),
        propiedad,
        usuario: req.usuario
    });
};

export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad
};