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

// Mostrar todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedido.find({})
            // Obtiene la referencia del modelo cliente
            .populate('cliente')
            // Obtiene la referencia del modelo producto
            .populate({
                // Ruta del pruducto
                path: 'pedido.producto',
                // Modelo
                model: 'Productos'
            }
        );

        // Devolver una respuesta
        res.json(pedidos);
        
    } catch (error) {
        console.log(error);
        next();
    }
};