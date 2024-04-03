import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ClienteAxios
import clienteAxios from '../../config/axios';
// Components
import Cliente from './Cliente';

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

            <Link to={'/clientes/nuevo'} className='btn btn-verde nvo-cliente'>
                <i className='fas fa-plus-circle'></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id} 
                        cliente={cliente}
                    />                    
                ))}
            </ul>
        </Fragment>
    );
};

export default Clientes;