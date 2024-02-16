import express from 'express';

const router = express.Router();

// router.get('/', function (req, res) {
//     res.json({msg: 'Hola mundo desde Express!'});
// });

// router.post('/', function (req, res) {
//     res.json({msg: 'Respuesta de tipo POST'});
// });

router.get('/', (req, res) => {
    res.json({msg: 'Hola mundo desde Express!'});
});

router.post('/', (req, res) => {
    res.json({msg: 'Respuesta de tipo POST'});
});

// Otra forma
// router.route('/')
//     .get(function (req, res) {
//         res.json({msg: 'Hola mundo desde Express!'});
//     })
//     .post(function (req, res) {
//         res.json({msg: 'Respuesta de tipo POST'});
//     });

export default router;