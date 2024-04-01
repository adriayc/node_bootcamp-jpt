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

// Obtener todos los cliente
exports.mostrarClientes = async (req, res, next) => {
    try {
        // Obtener todos clientes
        const clientes = await Cliente.find({});

        // Devolver una respuesta
        res.json(clientes);

    } catch (error) {
        console.log(eroor);
        next();
    }
};

// Obtener un cliente por ID
exports.mostrarCliente = async (req, res, next) => {
    /*
    // Obtener el cliente
    const cliente = await Cliente.findById(req.params.id);

    // Validar que exista (Error de validacion)
    if (!cliente) {
        res.json({mensaje: 'El cliente no existe'});
        next();
    }

    // Devolver una respuesta
    res.json(cliente);
    */

    try {
        // Obtener el cliente
        const cliente = await Cliente.findById(req.params.id);

        // Validar que exista
        if (!cliente) {
            res.json({mensaje: 'El cliente no existe'});
            next();
        }

        // Devolver una respuesta
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        next();
    }
};

// Actualizar el cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Cliente.findOneAndUpdate({_id: req.params.id}, req.body, {
            // Devuelve el doc nuevo
            new: true
        });

        // Devolver una respuesta
        res.json(cliente);

    } catch (error) {
        console.log(error);
        next();
    }
};

// Eliminar un cliente por su ID
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Cliente.findOneAndDelete({_id: req.params.id});

        // Devolver una respuesta
        res.json({mensaje: 'Se ha eliminado el cliente correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
};