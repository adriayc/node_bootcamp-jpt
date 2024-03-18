const mongoose = require('mongoose');
const slug = require('slug');
const shortid = require('shortid');

mongoose.Promise = global.Promise;

// Crear el schema
const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        trim: true,
        require: 'El nombre de la vacante es obligatorio',
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: 'La ubicacion es obligatoria'
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [String],
    candidatos: [{
        nombre: String,
        email: String,
        cv: String
    }],
    autor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuarios',
        required: 'El autor es obligatorio'
    }
});
// Definir middleware antes de guardar
vacantesSchema.pre('save', function (next) {
    // Crear la url
    const url = slug(this.titulo);                  // Generar un slug del titulo. Ej: si el titulo es 'React Developer', el slug será 'react-developer'
    this.url = `${url}-${shortid.generate()}`;      // Generar una url unica. Ej react-developer-3342143

    next();
});

// Crear un indice (Busqueda)
vacantesSchema.index({titulo: 'text'});

module.exports = mongoose.model('Vacante', vacantesSchema);