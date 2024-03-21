const nodemailer = require('nodemailer');
const fs = require('fs');               // File system untilidad de nodejs
const util = require('util');
const ejs = require('ejs');
// Config emails
const emailConfig = require('../config/emails');

const transport = nodemailer.createTransport({
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
    console.log(opciones);

    // Leer el archivo para el email

    // Compilarlo

    // Crear el HTML

    // Configurar las opciones del email

    // Enviar el email
};