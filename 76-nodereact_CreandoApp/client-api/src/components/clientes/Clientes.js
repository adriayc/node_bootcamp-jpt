import { Fragment, useEffect, useState } from 'react';
// ClienteAxios
import clienteAxios from '../../config/exios';

const Clientes = () => {
    // Hook useState - clientes: state y guardarCliente: funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    // Query a la API
    const consultarAPI = async () => {
        // console.log('Consultado...');

        const clientesConsulta = await clienteAxios.get('/clientes');
        // console.log(clientesConsulta.data);

        guardarClientes(clientesConsulta.data);
    };

    // Hook useEfect, similar a componetdidmount y willmount
    useEffect(() => {
        consultarAPI();
    }, []);             // [] - Ejecuta solo una vez


    return (
        <Fragment>
            <h2>Clientes</h2>

            <ul className='listado-clientes'>
                {clientes.map(cliente => {
                    console.log(cliente);
                })}
            </ul>
        </Fragment>
    );
};

export default Clientes;