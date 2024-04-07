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

// Mostrar un pedido por ID
exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            }
        );

        // Validar que exista el pedido
        if (!pedido) {
            res.json({'mesaje': 'El pedido no existe'});
            return next();
        }

        // Devolver una respuesta
        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
};

// Actualizar un pedido por ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedido.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        // Devolver una respuesta
        res.json(pedido);
        
    } catch (error) {
        console.log(error);
        next();
    }
};

// Eliminar un pedido por ID
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedido.findOneAndDelete({_id: req.params.id});

        // Devolver una respuesta
        res.json({mensaje: 'Se ha eliminado el pedido correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
}; 