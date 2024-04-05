const mongoose = require('mongoose');
// Inicializar schema
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        require: 'El nombre es requerido'
    },
    password: {
        type: String,
        require: true
    }
});

// Exportar el modelo
module.exports = mongoose.model('Usuarios', usuarioSchema);
