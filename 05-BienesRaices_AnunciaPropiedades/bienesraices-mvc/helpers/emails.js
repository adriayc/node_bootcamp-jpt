// Nodemailer
import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    // console.log(datos);

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const { nombre, email, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'info@bienesraices.com',
        to: email,
        subject: 'Confirma tu cuenta en bienesraices.com',
        text: 'Confirma tu cuenta en bienesraices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>

            <p>
                Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma Cuenta</a>
            </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
};

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const { nombre, email, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'info@bienesraices.com',
        to: email,
        subject: 'Restablecer tu password en bienesraices.com',
        text: 'Restablecer tu password en bienesraices.com',
        html: `
            <p>Hola ${nombre}, has solitado reestablecer tu password en bienesraices.com</p>

            <p>
                Sigue el siguente enlace para generar un password nuevo:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer Password</a>
            </p>

            <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
        `
    });
};

export {
    emailRegistro,
    emailOlvidePassword
};