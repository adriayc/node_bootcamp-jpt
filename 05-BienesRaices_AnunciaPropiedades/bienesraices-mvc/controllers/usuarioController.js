import { check, validationResult } from 'express-validator';
// Models
import Usuario from '../models/Usuario.js';

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
    await check('repetir_password').equals('password').withMessage('Los passwords no son iguales').run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado este vacio

    res.json(resultado.array());

    const usuario = await Usuario.create(req.body);

    res.json(usuario);
    // return res.json(usuario);
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
    formularioOlvidePassword
};