const multer = require('multer');
const shortid = require('shortid');
// Models
const Categoria = require('../models/Categoria');
const Grupo = require('../models/Grupo');

// Configuracion de multer
const configuracionMulter = {
    // filesize [bits]
    limits: {fileSize: 100000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname +'/../public/uploads/grupos');
        },
        filename: (req, file, next) => {
            // console.log(file.minetype);
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next) {
        // console.log(file.mimetype);
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //  El formato del archivo es valido (true = aceptando archivo)
            next(null, true)
        } else {
            // El formato del archivo no es valido (false = rechazando archivo)
            next(new Error('Formato no válido'), false);
        }
    }
};

// Inicializar multer
const upload = multer(configuracionMulter).single('imagen');

exports.formNuevoGrupo = async (req, res) => {
    const categorias = await Categoria.findAll();
    // console.log(categorias);
    // return;

    res.render('nuevo-grupo', {
        nombrePagina: 'Crear un nuevo grupo',
        categorias
    });
};

// Subir imagen al grupo al servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            // console.log(error);
            // Manejar errores
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande');
                } else {
                    req.flash('error', error.message);
                }
            } else if (error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }

            // Redireccionar atras
            res.redirect('back');
            return;
        } else {
            next();
        }
    });
};

// Guardar el grupo en la DB
exports.crearGrupo = async (req, res) => {
    // console.log(req);
    // console.log(req.file);

    // Sanitizar los campos
    req.sanitizeBody('nombre');
    req.sanitizeBody('url');

    const grupo = req.body;
    // console.log(grupo); return;

    // Almacena ID del usuario autenticado como creardor del grupo
    grupo.usuarioId = req.user.id;
    // Almacenar ID de la categoria
    // grupo.categoriaId = req.body.Categoria;

    // console.log(grupo); return;

    // Leer la imagen del grupo (Si solo hay un archivo)
    if (req.file) {
        grupo.imagen = req.file.filename;
    }

    try {
        // Almacenar el DB
        await Grupo.create(grupo);

        req.flash('exito', 'Se ha creardo el grupo correctamente');
        // Redireccionar
        res.redirect('/administracion');

    } catch (error) {
        // console.log(error);

        // Extraer los error de sequelize
        const erroresSequelize = error.errors.map(err => err.message);

        // req.flash('error', error);
        req.flash('error', erroresSequelize);
        // Redireccionar
        res.redirect('/nuevo-grupo');
    }
};

// Editar grupo
exports.formEditarGrupo = async (req, res) => {
    // const grupo = await Grupo.findByPk(req.params.grupoId);
    // const categorias = await Categoria.findAll();
    // Promise con await
    // const consultas = [];
    // consultas.push(Grupo.findByPk(req.params.grupoId));
    // consultas.push(Categoria.findAll());
    // const [grupo, categorias] = await Promise.all(consultas);
    const [grupo, categorias] = await Promise.all([
        Grupo.findByPk(req.params.grupoId),
        Categoria.findAll()
    ]);
    // console.log(grupo);

    res.render('editar-grupo', {
        nombrePagina: `Editar Grupo: ${grupo.nombre}`,
        grupo,
        categorias
    });
};

// Guardar los cambios de editar grupo en la DB
exports.editarGrupo = async (req, res, next) => {
    const grupo = await Grupo.findOne({where: {id: req.params.grupoId, usuarioId: req.user.id}});

    // Validar el grupo (Si no exite el grupo y el usuario no el que lo creo)
    if (!grupo) {
        req.flash('error', 'Operación no válida');
        // Redireccionar
        res.redirect('/administracion');
        return next();
    }

    // Si todo es Ok
    const { nombre, descripcion, categoriaId, url } = req.body;

    // Asignar los valores
    grupo.nombre = nombre;
    grupo.descripcion = descripcion;
    grupo.categoriaId = categoriaId;
    grupo.url = url;

    // Guardar en la DB
    await grupo.save();

    req.flash('exito', 'Los cambios fueron almacenados correctamente');
    // Redireccionar
    res.redirect('/administracion');
};