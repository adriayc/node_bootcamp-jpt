const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
// Models
const Usuario = require('../models/Usuario');
// E-mail config
const enviarEmail = require('../handlers/emails');

// Configuracion de multer
const configuracionMulter = {
    // filesize [bits]
    limits: {fileSize: 100000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname +'/../public/uploads/perfiles');
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

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu Cuenta'
    });
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;
    // console.log(usuario);

    // req.checkBody('repetir-password', 'El repetir password es requerido').not().empty();
    req.checkBody('repetir-password', 'El repetir password es requerido').notEmpty();
    req.checkBody('repetir-password', 'El password es distinto').equals(req.body.password);

    // Leer los errores de express
    const erroresExpress = req.validationErrors();
    // console.log(erroresExpress);

    try {
        // const nuevoUsuario = await Usuario.create(usuario);
        await Usuario.create(usuario);
        // console.log('Usuario creado', nuevoUsuario);

        // Generar URL de confirmacion
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        // Enviar email de confirmacion
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        });
    
        // Flash message y redireccionar
        req.flash('exito', 'Hemos enviando un E-mail, confirma tu cuenta');
        res.redirect('/iniciar-sesion');

    } catch (error) {
        // console.log(error);
        // Extraer errores de sequelize
        const erroresSequelize = error.errors.map(err => err.message);
        // console.log(erroresSequelize);

        // Extraer error de express
        const errorExpress = erroresExpress.map(err => err.msg);
        // console.log(errorExpress);

        // Unir los errores
        const listaErrores = [...erroresSequelize, errorExpress];

        // req.flash('error', erroresSequelize);
        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }
};

// Confirmar la cuenta del usuario
exports.confirmarCuenta = async (req, res, next) => {
    // console.log(req.params.correo);

    // Verificar que el usuario exista
    const usuario = await Usuario.findOne({where: {email: req.params.correo}});
    // console.log(usuario);
    
    // Si no existe, redireccionar
    if (!usuario) {
        req.flash('error', 'No existe la cuenta');
        res.redirect('/crear-cuenta');
        return next();
    }

    // Si existe, confirmar suscripcion y redireccionar
    usuario.activo = true;
    await usuario.save();

    req.flash('exito', 'La cuenta se ha confirmado correctamente, ya puedes iniciar sesión');
    res.redirect('/iniciar-sesion');
};

exports.formIniciarSesion = (req, res) => {
    res.render('inciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    });
};

// Formulario para editar perfil
exports.formEditarPerfil = async (req, res) => {
    const usuario = await Usuario.findByPk(req.user.id);

    res.render('editar-perfil', {
        nombrePagina: 'Editar Perfil',
        usuario
    });
};

// Guardar los campos del perfil en la DB
exports.editarPerfil = async (req, res) => {
    const usuario = await Usuario.findByPk(req.user.id);
    
    // Sanitizar los valores
    req.sanitizeBody('nombre');
    req.sanitizeBody('descripcion');
    req.sanitizeBody('email');

    // Extraer los datos
    const { nombre, descripcion, email } = req.body;

    // Asignar los valores
    usuario.nombre = nombre;
    usuario.descripcion = descripcion;
    usuario.email = email;

    // Guardar en la DB
    await usuario.save();

    req.flash('exito', 'Se ha actualizado correctamente');
    // Redireccionar
    res.redirect('/administracion');
};

// Formulario para editar el password
exports.formCambiarPassword = (req, res) => {

    res.render('cambiar-password', {
        nombrePagina: 'Cambiar Password'
    });
};

// Guardar nuevo password en la DB
exports.cambiarPassword = async (req, res, next) => {
    const usuario = await Usuario.findByPk(req.user.id);

    // Validar que el password actual sea igual al del usuario
    if (!usuario.validarPassword(req.body.actualPassword)) {
        req.flash('error', 'El password actual es incorrecto');
        // Redireccionar
        res.redirect('/administracion');
        return next();
    }

    // Hashear el nuevo password
    const hash = usuario.hashPassword(req.body.nuevoPassword);
    // console.log(hash); return;

    // Asignar el password
    usuario.password = hash;

    // Guardar en la DB
    await usuario.save();

    // Logout (Cerrar sesión)
    // req.logout();
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('exito', 'Se ha actualizado el password correctamente, vuelve a iniciar sesión');
        // Redireccionar
        res.redirect('/iniciar-sesion');
    });

    // req.flash('exito', 'Se ha actualizado el password correctamente, vuelve a iniciar sesión');
    // // Redireccionar
    // res.redirect('/iniciar-sesion');
};

// Formulario para editar la imagen de perfil
exports.formEditarImagenPerfil = async (req, res) => {
    const usuario = await Usuario.findByPk(req.user.id);

    res.render('imagen-perfil' ,{
        nombrePagina: 'Subir Imagen Perfil',
        usuario
    });
};

// Subir imagen de perfil al servidor
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

// Guardar la imagen de perfil en DB (Si exite una anterior elimininalo) 
exports.editarImagenPerfil = async (req, res) => {
    const usuario = await Usuario.findByPk(req.user.id);

    // Si ay imagen anterior, eliminarlo
    if (req.file && usuario.imagen) {
        const imagenAnteriorPath = __dirname +`/../public/uploads/perfiles/${usuario.imagen}`;

        // Eliminar el achivo con filesystem
        fs.unlink(imagenAnteriorPath, (error) => {
            if (error) {
                console.log(error);
            }
            return;
        });
    }

    // Asignar la nueva imagen
    if (req.file) {
        usuario.imagen = req.file.filename;
    }

    // Guardar en la DB
    await usuario.save();

    req.flash('exito', 'Se ha almacenado la imagen correctamente');
    // Redireccionar
    res.redirect('/administracion');
};