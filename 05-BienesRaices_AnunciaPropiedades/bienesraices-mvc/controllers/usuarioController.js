import { check, validationResult } from 'express-validator';
// BCrypt
import bcrypt from 'bcrypt';
// Models
import Usuario from '../models/Usuario.js';
// Helpers
import { generarId, generarJWT } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    });
};

const autenticar = async (req, res) => {
    // console.log('Autenticando...');

    // Validación
    await check('email').isEmail().withMessage('El email no es valido').run(req);
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado de la validaciones no este vacio
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    const { email, password } = req.body;

    // Comprobar sí el usuario existe
    const usuario = await Usuario.findOne({where: {email}});
    // console.log(usuario);

    if (!usuario) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario no existe'}]
        });
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
        });
    }

    // Revisar el password
    if (!usuario.verificarPassword(password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El password es incorrecto'}]
        });
    }

    // Autenticar al usuario
    // const token = jwt.sign({
    //     nombre: 'Adriano',
    //     empresa: 'AACSoft SRL',
    //     tecnologias: 'Node.js'
    // }, 'palabrasupersecreta', {
    //     expiresIn: '1d'
    // });

    const token = generarJWT({
        id: usuario.id,
        nombre: usuario.nombre
    });
    // console.log(token);

    // Almacenar en un cookee
    return res.cookie('_token', token, {
        // Evitar ataques cross-site (XSS)
        httpOnly: true,
        // expires: 9000,
        // Permitir en conexiones seguras (SSL)
        // secure: true,
        // sameSite: true
    }).redirect('/mis-propiedades');
};

const cerrarSesion = (req, res) => {
    // res.send('Crerrando sesion...');

    return res.clearCookie('_token').status(200).redirect('/auth/login');
};

const formularioRegistro = (req, res) => {
    // console.log(req.csrfToken());

    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    });
};

const registrar = async (req, res) => {
    // console.log('Registrando...');
    // console.log(req.body);

    // Validación
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('El email no es valido').run(req);
    // await check('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es valido').run(req);
    await check('password').isLength({min: 6}).withMessage('El password debe contener al menos 6 caracteres').run(req);
    // await check('repetir_password').equals('password').withMessage('Los passwords no son iguales').run(req);            // Error!
    await check('repetir_password').equals(req.body.password).withMessage('Los passwords no son iguales').run(req);

    let resultado = validationResult(req);

    // res.json(resultado.array());

    // Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Extraer los datos
    const {nombre, email, password} = req.body;

    // Verificar que el usuario no este duplicado
    // const existeUsuario = await Usuario.findOne({where: {email: req.body.email}});
    const existeUsuario = await Usuario.findOne({where: {email}});
    // console.log(existeUsuario);
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya esta registrado'}],
            // errores: [{msg: 'El usuario ya existe'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    // return;

    // const usuario = await Usuario.create(req.body);

    // res.json(usuario);
    // return res.json(usuario);

    // Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        // token: 123
        token: generarId()
    });

    // Envia email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    // Mostrar un mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un Email de Confirmación, presione en el enlace'
    });
};

// Funcion que comprueba una cuenta
const confirmar = async (req, res, next) => {
    // console.log('Confirmando...');
    // console.log(req.params.token);

    const { token } = req.params;
    // console.log(token);

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({where: {token}});
    // console.log(usuario);
    // console.log(usuario.token);
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();       // Persistir los datos

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
    });

    // next();     // Ir al siguiente middleware
};

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices',
        csrfToken: req.csrfToken()
    });
};

const resetPassword = async (req, res) => {
    // console.log('Reset password...')

    // Validación
    await check('email').isEmail().withMessage('El email es invalido').run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    const { email } = req.body;

    // Buscar el usuario
    const usuario = await Usuario.findOne({where: {email}})
    // console.log(usuario);

    if (!usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningún usuario'}]
        })
    }

    // Generar un token
    usuario.token = generarId();
    usuario.save();

    // Enviar un email
    emailOlvidePassword({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    // Renderizar un mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece tu Password',
        mensaje: 'Hemos enviado un email con las instrucciones'
    });
};

const comprobarToken = async (req, res, next) => {
    // Enviar al siguiente middleware
    // next();

    const { token } = req.params;

    const usuario = await Usuario.findOne({where: {token}});
    // console.log(usuario);

    // Validar si el usuario no existe 
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Restablece tu Password',
            mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        });
    }

    // Mostrar el formulario para modificar el password
    res.render('auth/reset-password', {
        pagina: 'Reestablece tu Password',
        csrfToken: req.csrfToken()
    });
};

const nuevoPassword = async (req, res) => {
    // console.log('Guardando password...');

    // Validar el password
    await check('password').isLength({min: 6}).withMessage('El password debe contener al menos 6 caracteres').run(req);

    let resultado = validationResult(req);

    // Varificar el resultado de la validacion
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/reset-password', {
            pagina: 'Reestablece tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    const { token } = req.params;
    const { password } = req.body;

    // Identificar quien hace el cambio
    const usuario = await Usuario.findOne({where: {token}});

    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    // Persistir los cambios
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Password Reestablecido',
        mensaje: 'El password se guardó correctamente'
    });
};

export {
    formularioLogin,
    autenticar,
    cerrarSesion, 
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
};