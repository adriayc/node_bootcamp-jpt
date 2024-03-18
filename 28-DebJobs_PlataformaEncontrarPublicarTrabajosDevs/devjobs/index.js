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
// Express validator
const expressValidator = require('express-validator');
// Connect flash
const flash = require('connect-flash');
// Passport config
const passport = require('./config/passport');
// Http errors
const createError = require('http-errors');


// Env
require('dotenv').config({path: 'variables.env'});
// Config mongoDB
require('./config/db');

const app = express();

// Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar validacion (Express-Validator)
app.use(expressValidator());

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

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Habilitar flash (Alertas) - Debe ir antes del router o rutas
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

// app.use('/', (req, res) => {
//     res.send('Hola Mundo NodeJS!');
// });
app.use('/', router());

// 404 - Pagina no existente
app.use((req, res, next) => {
    next(createError(404, 'No encontrado'));
});

// Administracion de los errores
app.use((error, req, res) => {
    // console.log(error.message);
    // console.log(error.status);
    
    res.locals.mensaje = error.message;
    
    const status = error.status || 500;
    res.status(status);
    res.locals.status = status;

    res.render('error');
});

// Dehar que heroky asigne el puerto
const host = '0.0.0.0';
const port = process.env.PORT || process.env.PUERTO;

// Puerto
// app.listen(5000);
// app.listen(process.env.PUERTO);
app.listen(port, host, () => {
    console.log('El servidor esta funcionado correctamente');
});