const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('Hola Mundo NodeJS!');
});

// Puerto
app.listen(5000);