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

exports.enviar = async (opciones) => {
    const opcionesEmail = {
        from: 'devJobs <noreplay@devjobs.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        template: opciones.archivo,
        context: {
            resetURL: opciones.resetURL
        }
    };

    const sendMail = util.promisify(transport.sendMail, transport);
    
    return sendMail.call(transport, opcionesEmail); 
};