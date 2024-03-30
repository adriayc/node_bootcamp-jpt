const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// Configurar dotenv
require('dotenv').config({path: 'variables.env'});
// Routers
const router = require('./routes');
// Configuracion postgres
const db = require('./config/db');
// Body parser
const bodyParser = require('body-parser');
// Flash message
const flash = require('connect-flash');
// Cookie parser
const cookieParser = require('cookie-parser');
// Session
const session = require('express-session');
// Express validator
const expressValidator = require('express-validator');
// Config passport
const passport = require('./config/passport');

// Habilitar los modelos de forma global
require('./models/Usuario');
require('./models/Categoria');
require('./models/Grupo');
require('./models/Meeti');
require('./models/Comentario');
// Habilitar sequelize postgres
db.sync().then(() => console.log('DB Conectado')).catch(error => console.log(error));

// Inicializar express
const app = express();

// Habilitar bodyParser (leer formularios)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar express validator 
app.use(expressValidator());

// Habilitar express layout
app.use(expressLayouts);

// Habilitar EJS como template engine
app.set('view engine', 'ejs');

// Ubicacion de la vistas
app.set('views', path.join(__dirname, './views'));

// Archivos staticos
app.use(express.static('public'));

// Habilitar cookie parser
app.use(cookieParser());

// Habilitar flash messages
app.use(flash());

// Crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: true
}));

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Customs Middleware (usuarios logueados, flash message, fecha actual)
app.use((req, res, next) => {
    // Usuario logueado
    res.locals.usuario = {...req.user} || null;
    // Flash message
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    // Siguiente middleware
    next();
});

// Habilitar rutas
app.use('/', router());

// Agregar el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionado');
});