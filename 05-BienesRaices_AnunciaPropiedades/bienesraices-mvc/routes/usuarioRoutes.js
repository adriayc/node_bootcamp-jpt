import express from 'express';
// Controllers
import { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/olvide-password', formularioOlvidePassword);

export default router;