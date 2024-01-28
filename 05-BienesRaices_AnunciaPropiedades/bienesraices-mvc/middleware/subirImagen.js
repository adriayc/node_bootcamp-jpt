// Multer
import multer from 'multer';
// Path propio de Node.js
import path from 'path';
// Middlewares
import { generarId } from '../helpers/tokens.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Se llama cuando se sube el archivo (error, ruta_archivo)
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        // Se llama cuando se sube el archivo (error, nombre_unico_extension_archivo_original)
        cb(null, generarId() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

export default upload;