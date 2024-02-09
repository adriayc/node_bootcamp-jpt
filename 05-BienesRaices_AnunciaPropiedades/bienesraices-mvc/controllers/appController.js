import { Sequelize } from 'sequelize';
// Models
import { Categoria, Precio, Propiedad } from '../models/index.js';

const inicio = async (req, res) => {
    const [categorias, precios, casas, departamentos] = await Promise.all([
        // Formato raw
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 1
            },
            include: [
                {model: Precio, as: 'precio'}
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 2
            },
            include: [
                {model: Precio, as: 'precio'}
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ]);
    // console.log(categorias);
    console.log(casas);

    res.render('inicio', {
        pagina: 'Inicio',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        casas,
        departamentos
    });
};

const categoria = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    // Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id);
    // console.log(categoria);

    if (!categoria) {
        return res.redirect('/404');
    }

    // Obtener las propiedades del la categoria
    const propiedades = await Propiedad.findAll({
        where: {
            categoriaId: id
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    });

    res.render('categoria', {
        pagina: `${categoria.nombre}s en Venta`,
        csrfToken: req.csrfToken(),
        propiedades
    });
};

const noEncontrado = (req, res) => {
    res.render('404', {
        pagina: 'No Encontrada',
        csrfToken: req.csrfToken()
    });
};

const buscador = async (req, res) => {
    const { termino } = req.body;
    // console.log(termino);

    if (!termino) {
        // Redirige a la pagina donde se encontraba
        return res.redirect('back');
    }

    // Consultar las propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like]: '%'+ termino +'%'
            }
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    });
    // console.log(propiedades);

    res.render('busqueda', {
        pagina: 'Resultados de la Búsquedas',
        csrfToken: req.csrfToken(),
        propiedades,
    });
};

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
};