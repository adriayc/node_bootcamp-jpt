// Models
import { Propiedad, Categoria, Precio } from '../models/index.js';

const propiedades = async (req, res) => {
    // Obtener todas la propiedad (si existe muchos registros limitar los ultimos para evitar la latencia)
    const propiedades = await Propiedad.findAll({
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    });

    res.json(propiedades);
};

export {
    propiedades
};