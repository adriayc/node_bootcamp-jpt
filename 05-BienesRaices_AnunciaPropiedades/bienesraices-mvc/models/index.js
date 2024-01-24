// Models
import Usuario from './Usuario.js'
import Propiedad from './Propiedad.js';
import Categoria from './Categoria.js';
import Precio from './Precio.js';

// Relacion 1:1
// Una Propiedad tiene un Precio
// Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio, {foreignKey: 'fk_precioId'});

export {
    Usuario,
    Propiedad,
    Categoria,
    Precio
};