// Models
const Pedido = require('../models/Pedido');

// Crear un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedido(req.body);

    try {
        await pedido.save();

        // Devolver un respuesta
        res.json({'mensaje': 'Se ha agregado el pedido correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
};