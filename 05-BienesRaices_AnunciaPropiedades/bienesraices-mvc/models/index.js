// Models
import Usuario from './Usuario.js'
import Propiedad from './Propiedad.js';
import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Mensaje from './Mensaje.js';

// Relacion 1:1
// Una Propiedad tiene un Precio
// Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio, {foreignKey: 'precioId'});
// Una Propiedad tiene una Categoria
// Categoria.hasOne(Propiedad);
Propiedad.belongsTo(Categoria,  {foreignKey: 'categoriaId'});
// Una Propiedad tiene un Usuario
// Usuario.hasOne(Propiedad);
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'})

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'});
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'});

export {
    Usuario,
    Propiedad,
    Categoria,
    Precio,
    Mensaje
};