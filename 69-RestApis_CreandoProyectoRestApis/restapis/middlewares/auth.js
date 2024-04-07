const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Autorizacion por el header
    const authHeader = req.get('Authorization');
    // console.log(authHeader);

    if (!authHeader) {
      const error = new Error('No autenticado, no hay JWT');
      error.statusCode = 401;
      throw error;
    }

    // Obtener el token
    const token = authHeader.split(' ')[1];
    // console.log(token); return;

    let revisarToken;

    try {
      // Verificar el token
      revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // Validar token
    if (!revisarToken) {
      const error = new Error('No autenticado');
      error.statusCode = 401;
      throw error;
    }

    // Psar al siguiente middleware
    next();
};
