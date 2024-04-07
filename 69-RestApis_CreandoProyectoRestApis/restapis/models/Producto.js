const mongoose = require('mongoose');
// Inicializar schema
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
});

// Exportar el modelo
module.exports = mongoose.model('Productos', productoSchema);