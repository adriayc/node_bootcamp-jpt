// OLD
const express = require('express');

// Crear la app
const app = express();

// Routing
app.get('/', function (req, res) {
    res.send('Hola mundo desde Express!');
    // res.json({msg: 'Hola mundo desde Express!'});
    // res.render({msg: 'Hola mundo desde Express!'});
});

app.get('/nosotros', function (req, res) {
    res.send('Desde pagina de Nosotros');
});

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor funcionado en el puerto ${port}`);
});