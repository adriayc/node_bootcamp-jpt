const mongoose = require('mongoose');
// Inicializar schema
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

// Exportar el modelo
module.exports = mongoose.model('Clientes', clienteSchema);

