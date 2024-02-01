import express from 'express';
import { body } from 'express-validator';
// Middlewares
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';
// Controllers
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar } from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedades/crear', protegerRuta, crear);
// router.put('/propiedades/crear',         // El verbo PUT no existe (Solo existe en REST API)
router.post('/propiedades/crear', 
    protegerRuta,
    // Validacion de los campos en el router
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La descripcion es obligatorio')
        .isLength({max: 200}).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardar
);
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen);
// Multiple imagenes
// router.post('/propiedades/agregar-imagen/:id', upload.array('imagen'));
// Una sola imagen
router.post('/propiedades/agregar-imagen/:id', protegerRuta, upload.single('imagen'), almacenarImagen);
router.get('/propiedades/editar/:id', protegerRuta, editar);
// router.update();     // Error no soporta el navegador
router.post('/propiedades/editar/:id',
    protegerRuta,
    // Validacion de los campos
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La descripcion es obligatorio')
        .isLength({max: 200}).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios
);
// router.delete();     // Error no soporta el navegador
router.post('/propiedades/eliminar/:id', protegerRuta, eliminar);

export default router;