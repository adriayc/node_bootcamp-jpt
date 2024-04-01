const shortid = require('shortid');
const multer = require('multer');
// Models
const Producto = require('../models/Producto');

// Configuracion de multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            // cb(null, __dirname +'../../uploads/');
            cb(null, __dirname +'/../uploads/');
        },
        filename: (req, file, cb) => {
            const extesion = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extesion}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Erro('Formato no válido'), false);
        }
    }
};

// Inicializar multer con la configuracion (Definimos el campo 'imagen')
const upload = multer(configuracionMulter).single('imagen');

// Subir un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            // Devolver una respuesta
            res.json({mensaje: error})
        }

        // Retornar la redireccion al siguente middleware
        return next();
    });
};

// Crear un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);
    // console.log(req.file); return;

    try {
        // Validar que exista un archivo
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }

        // Almacenamos el registro
        await producto.save();

        // Devolver una respuesta
        res.json('Se ha creado el producto correctamente');

    } catch (error) {
        console.log(error);
        next();
    }
};

// Obtiene todo los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({});

        // Devolver una respuesta
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        next();
    }
};