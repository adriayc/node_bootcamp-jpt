// const mongoose = require('mongoose');
const multer = require('multer');
const shortid = require('shortid');
// Models
const Vacante = require('../models/Vacantes');          // OPTION #1
// const Vacante = mongoose.model('Vacante');              // OPTION #2 - Error!

exports.formularioNuevoVacante = (req, res) => {
    // res.send('Formulario nuevo vacante');
    res.render('nueva-vacante', {
        npmbrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante',
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        cerrarSesion: true,
    });
};

// Validar y sanitizar los campos de las vacantes
exports.validarVacante = (req, res, next) => {
    // Sanitizar los campos
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    // Validar los campos
    // req.checkBody('titulo', 'Agrega un Titulo a la vacante').not().empty();
    req.checkBody('titulo', 'El titulo es requerido').notEmpty();
    req.checkBody('empresa', 'La empresa es requerida').notEmpty();
    req.checkBody('ubicacion', 'La ubicacion es requerida').notEmpty();
    req.checkBody('contrato', 'El contrato es requerido').notEmpty();
    req.checkBody('skills', 'Los skills son requeridos').notEmpty();

    const errores = req.validationErrors();
    // console.log(errores);
    // return;

    // Si existe erroes
    if (errores) {
        req.flash('error', errores.map(error => error.msg));

        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            nombre: req.user.nombre,
            cerrarSesion: true,
            mensajes: req.flash()
        });
        return;
    }

    // Siguiente middleware
    next();
};

// Agrega la vacante a la base de datos
exports.agregarVacante = async (req, res) => {
    // console.log(req.body);

    const vacante = new Vacante(req.body);
    // Agregar el autor al vacante
    vacante.autor = req.user._id;

    // Crear un arreglo de skills (habilidades)
    vacante.skills = req.body.skills.split(',');
    // console.log(vacante);

    // Guardar en la base de datos
    const nuevaVacante = await vacante.save();

    // Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
};

// Mosrar una vacante
exports.mostrarVacante = async (req, res, next) => {
    // const vacante = await Vacante.findOne({url: req.params.url});
    // const vacante = await Vacante.findOne({url: req.params.url}).lean();
    const vacante = await Vacante.findOne({url: req.params.url}).populate('autor').lean();              // JOIN mongoose
    // console.log(vacante);

    // Si no hay resultados
    if (!vacante) return next();

    res.render('vacante', {
        nombrePagina: vacante.titulo,
        barra: true,
        vacante
    })
};

// Editar una vacante
exports.formEditarVacante = async (req, res, next) => {
    // const vacante = await Vacante.findOne({url: req.params.url});
    const vacante = await Vacante.findOne({url: req.params.url}).lean();

    if (!vacante) return next();

    res.render('editar-vacante', {
        nombrePagina: `Editar - ${vacante.titulo}`,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        cerrarSesion: true,
        vacante
    });
};

// Guardar editar vacantes
exports.editarVacante = async (req, res) => {
    const vacanteActualizada = req.body;
    vacanteActualizada.skills = req.body.skills.split(',');
    // console.log(vacanteActualizada);

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url}, vacanteActualizada, {
        // Devuelve el documento actualizado
        new: true,
        runValidators: true
    });

    // Redireccionar
    res.redirect(`/vacantes/${vacante.url}`);
};

// Eliinar vacante
exports.eliminarVacante = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    // const vacante = await Vacante.findById(id);
    const vacante = await Vacante.findById(id).exec();
    // console.log(vacante);
    // return;

    // Validar que autor de la vacante sea igual al user
    if (verificarAutor(vacante, req.user)) {
        // El usuario es el mismo, eliminar vacante
        // vacante.remove();                       // Error!   
        await Vacante.deleteOne({_id: id});     // Ok
        // await Vacante.findByIdAndDelete(id);    // Ok

        // Responde con status y mensaje
        res.status(200).send('Vacante eliminado correctamente');
    } else {
        // El usuario es distinto, redirigir

        res.status(403).send('Error');
    }
};

const verificarAutor = (vacante = {}, usuario = {}) => {
    // Metodo mongoose para comparar
    if (!vacante.autor.equals(usuario._id)) {
        return false;
    }
    return true;
};

// Subir archivos en PDF
exports.subirCV = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande (Máximo 100Kb)')
                } else {
                    req.flash('error', error.message);
                }
            } else {
                req.flash('error', error.message);
            }

            // Redirigir a la página actual
            res.redirect('back');
            return;
        } else {
            return next();
        }
    });
};

// Opciones de multer
const configuracionMulter = {
    limits: {fileSize: 100000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../public/uploads/cv');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        // Validacion por el MimeType (Recomendado)
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'));
        }
    }
};

const upload = multer(configuracionMulter).single('cv');

// Almacenar los cantidatos en la db
exports.contactar = async (req, res, next) => {
    // console.log(req.params.url);
    const vacante = await Vacante.findOne({url: req.params.url});

    // Si no existe la vacante
    if (!vacante) return next();

    // Construir el nuevo objeto
    const nuevoCantidato = {
        nombre: req.body.nombre,
        email: req.body.email,
        cv: req.file.filename
    };

    // Almacenar la vacante
    vacante.candidatos.push(nuevoCantidato);
    await vacante.save();

    req.flash('correcto', 'Se envió tu curriculum correctamente');
    // Redirigir
    res.redirect('/');
};

// Mostrar los candidatos de la vacante
exports.mostrarCandidatos = async (req, res, next) => {
    // console.log(req.params.id);
    // const vacante = await Vacante.findById(req.params.id);
    const vacante = await Vacante.findById(req.params.id).lean();
    // console.log(vacante);

    // Validar si existe vacante
    if (!vacante) return next();

    // Validar que el autor sea igual al usuario 
    if (vacante.autor.toString() !== req.user.id.toString()) {
        return next();
    }

    res.render('candidatos', {
        nombrePagina: `Candidatos Vacante - ${vacante.titulo}`,
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        candidatos: vacante.candidatos
    });
};

// Buscador de vacantes
exports.buscarVacantes = async (req, res) => {
    // console.log(req.body.q);
    const vacantes = await Vacante.find({
        $text: {
            $search: req.body.q
        }
    }).lean();
    // console.log(vacantes);

    // Mostrar las vacantes
    res.render('home', {
        nombrePagina: `Resultados para la búsqueda: ${req.body.q}`,
        barra: true,
        vacantes
    })
};