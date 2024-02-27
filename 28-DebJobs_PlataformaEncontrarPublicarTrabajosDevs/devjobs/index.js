const express = require('express');
// Routes
const router = require('./routes');

const app = express();

// app.use('/', (req, res) => {
//     res.send('Hola Mundo NodeJS!');
// });
app.use('/', router());

// Puerto
app.listen(5000);