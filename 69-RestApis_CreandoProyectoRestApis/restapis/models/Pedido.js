const mongoose = require('mongoose');
// Inicializar schema
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    // Realacion 1:1 (Un pedido tiene 1 ciente)
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    // Relacion 1:n (Un pedido tiene 1 o muchos productos)
    pedido: [{
       producto: {
        type: Schema.ObjectId,
        ref: 'Productos'
       },
       cantidad: Number
    }],
    total: {
        type: Number
    }
});

// Exportar el modelo
module.exports = mongoose.model('Pedidos', pedidoSchema);