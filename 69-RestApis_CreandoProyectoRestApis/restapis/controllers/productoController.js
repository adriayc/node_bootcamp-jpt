// Models
const Producto = require('../models/Producto');

// Crear un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);

    try {
        await producto.save();

        // Devolver una respuesta
        res.json('Se ha creado el producto correctamente');

    } catch (error) {
        console.log(error);
        next();
    }
};