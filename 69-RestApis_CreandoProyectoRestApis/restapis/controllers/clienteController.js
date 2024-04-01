// Models
const Cliente = require('../models/Cliente');

// Agregar un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    // console.log(req.body);

    // Crear un nuevo objeto cliente
    const cliente = new Cliente(req.body);

    try {
        // Almacenar el registro
        await cliente.save();

        // Devolver una respuesta
        res.json({mensaje: 'Se ha agregado el cliente correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
};