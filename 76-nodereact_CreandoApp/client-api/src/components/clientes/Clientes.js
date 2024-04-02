import { useEffect } from 'react';
// ClienteAxios
import clienteAxios from '../../config/exios';

const Clientes = () => {
    // Query a la API
    const consultarAPI = async () => {
        // console.log('Consultado...');

        const clientes = await clienteAxios.get('/clientes');
        console.log(clientes);
    };

    // Hook useEfect, similar a componetdidmount y willmount
    useEffect(() => {
        consultarAPI();
    }, []);             // [] - Ejecuta solo una vez

    return (
        <h2>Clientes</h2>
    );
};

export default Clientes;