import { check, validationResult } from 'express-validator';
// Models
import Usuario from '../models/Usuario.js';
// Helpers
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    });
};

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
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
const confirmar = (req, res, next) => {
    // console.log('Confirmando...');
    // console.log(req.params.token);

    const { token } = req.params;
    console.log(token);

    // Verificar si el token es válido

    // Confirmar la cuenta

    next();     // Ir al siguiente middleware
};

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    });
};

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
};