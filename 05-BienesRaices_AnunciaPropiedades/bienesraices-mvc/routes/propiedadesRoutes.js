import express from 'express';
import { body } from 'express-validator';
// Controllers
import { admin, crear, guardar } from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedades/crear', crear);
router.post('/propiedades/crear', 
    // Validacion de los campos en el router
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    guardar
);

export default router;