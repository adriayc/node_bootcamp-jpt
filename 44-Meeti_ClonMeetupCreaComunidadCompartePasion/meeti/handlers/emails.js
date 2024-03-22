const nodemailer = require('nodemailer');
const fs = require('fs');               // File system untilidad de nodejs
const util = require('util');
const ejs = require('ejs');
// Config emails
const emailConfig = require('../config/emails');

// const transport = nodemailer.createTransport({
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

// Enviar emails
exports.enviarEmail = async (opciones) => {
    // console.log(opciones);
    // return;

    // TEST
    // return await transport.sendMail({
    //     from: 'Adriano Ayala <infor@meeti.com>',
    //     to: 'adriano@correo.com',
    //     subject: 'Hello',
    //     text: 'Hello world?',
    //     html: '<b>Hello world</b>'
    // });

    // Leer el archivo para el email
    // const archivo = __dirname +`/../views/emails/${opciones.archivo}.ejs`;       // Error!
    const archivo = __dirname +`/../views/emails/${opciones.archivo}.ejs`;
    // console.log(archivo);
    // return;

    // Compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
    // console.log(compilado);

    // Crear el HTML
    const html = compilado({url: opciones.url});
    // console.log(html); return;

    // Configurar las opciones del email
    const opcionesEmail = {
        from: 'Meeti <noreaplay@meeti.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        html
    };
    // console.log(opcionesEmail); return;

    // Enviar el email
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, opcionesEmail);
};