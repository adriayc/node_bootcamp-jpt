const express = require('express');
const path =  require('path');              // Utilidad de node que permite obtener la URL
const bodyParser = require('body-parser');  // Utilidad de node que permite el envio por POST
// Mongoose
const mongoose = require('mongoose');
// Handlebars
const exphbs = require('express-handlebars');
// Routes
const router = require('./routes');
// Cookie parser
const cookieParser = require('cookie-parser');
// Express session
const session = require('express-session');
// Connect mongo y pasandole la session
// const MongoStore = require('connect-mongo')(session);        // Error!, old version
const MongoStore = require('connect-mongo');

// Env
require('dotenv').config({path: 'variables.env'});
// Config mongoDB
require('./config/db');

const app = express();

// Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar handlebars como 'view'
app.engine('handlebars', 
    // exphbs({         // Error!
    exphbs.engine({
        defaultLayout: 'layout',
        // Agregar los hepers
        helpers: require('./helpers/handlebars')
    })
);
app.set('view engine', 'handlebars');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,              // No vuelve a guardar otra vez
    saveUninitialized: true,    // No fuerza que un sesión 'no inicializada' se guarde en la store
    // store: new MongoStore({mogooseConnection: mongoose.connection})         // Error! old version
    store: MongoStore.create({mongoUrl: process.env.DATABASE})
}));

// app.use('/', (req, res) => {
//     res.send('Hola Mundo NodeJS!');
// });
app.use('/', router());

// Puerto
// app.listen(5000);
app.listen(process.env.PUERTO);