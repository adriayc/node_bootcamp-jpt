const express = require('express');
const path =  require('path');              // Utilidad de node que permite obtener la URL
// Handlebars
const exphbs = require('express-handlebars');
// Routes
const router = require('./routes');

// Env
require('dotenv').config({path: 'variables.env'});

const app = express();

// Habilitar handlebars como 'view'
app.engine('handlebars', 
    // exphbs({         // Error!
    exphbs.engine({
        defaultLayout: 'layout'
    })
);
app.set('view engine', 'handlebars');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res) => {
//     res.send('Hola Mundo NodeJS!');
// });
app.use('/', router());

// Puerto
// app.listen(5000);
app.listen(process.env.PUERTO);