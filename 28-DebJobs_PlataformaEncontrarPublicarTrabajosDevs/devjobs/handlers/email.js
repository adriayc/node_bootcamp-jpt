const util = require('util');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
// Configuracion del email
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});