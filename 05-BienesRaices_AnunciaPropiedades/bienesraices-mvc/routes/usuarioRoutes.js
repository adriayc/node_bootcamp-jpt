import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hola mundo desde Express!');
    // res.json({msg: 'Hola mundo desde Express!'});
    // res.render({msg: 'Hola mundo desde Express!'});
});

router.get('/nosotros', function (req, res) {
    res.send('Desde pagina de Nosotros');
});

export default router;