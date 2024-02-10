import jwt from 'jsonwebtoken';
// Models
import { Usuario } from '../models/index.js';

const identificarUsuario = async (req, res, next) => {
    // Identificar si hay token
    const token = req.cookies._token;

    if (!token) {
        req.usuario = null;

        return next();
    }

    // Comprobar el token
};

export default identificarUsuario;