import express from 'express';
// Controllers
import { admin, crear } from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedades/crear', crear);

export default router;