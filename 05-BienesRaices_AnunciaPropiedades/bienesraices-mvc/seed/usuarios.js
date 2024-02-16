// Bcrypt
import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre: 'Adriano',
        email: 'adriano@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('adriano123', 10)
    }
];

export default usuarios;