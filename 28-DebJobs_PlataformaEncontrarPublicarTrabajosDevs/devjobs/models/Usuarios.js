const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

// Crear el schema
const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expira: Date
});

// Método para hashear los passwords
usuariosSchema.pre('save', async function(next) {
    // Si el password esta hasheado
    if (!this.isModified('password')) {
        // Termina de ejecutar la funcion y avancer al siguiente middleware
        return next();
    }
    // Si no esta hasheado
    const hash  = await bcrypt.hash(this.password, 12);
    this.password = hash;

    // Termina de ejecutar la funcion y avancer al siguiente middleware
    next();
})

module.exports = mongoose.model('Usuarios', usuariosSchema);