import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ClienteAxios
import clienteAxios from '../../config/axios';
// Contexts
// import { CrmContext } from '../../context/CrmContent';
import CrmContext from '../../context/CrmContent';
// Components
import Spinner from '../layout/Spinner';
import Cliente from './Cliente';

const Clientes = () => {
    // Definir el context CrmContext
    // const [auth, guardarAuth] = useContext(CrmContext);
    const { auth, guardarAuth } = useContext(CrmContext);
    // console.log(auth);

    // Hook useState - clientes: state y guardarCliente: funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    const navigate = useNavigate();

    // // Query a la API
    // const consultarAPI = async () => {
    //     // console.log('Consultado...');

    //     const clientesConsulta = await clienteAxios.get('/clientes');
    //     // console.log(clientesConsulta.data);

    //     guardarClientes(clientesConsulta.data);
    // };

    // Hook useEfect, similar a componetdidmount y willmount
    useEffect(() => {
        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                // console.log('Consultado...');

                try {
                    // const clientesConsulta = await clienteAxios.get('/clientes');
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    // console.log(clientesConsulta.data);

                    guardarClientes(clientesConsulta.data);

                } catch (error) {
                    // console.log(error);

                    if (error.response.status === 500) {
                        // Redireccionar
                        navigate('/iniciar-sesion');
                    }
                }
            };

            consultarAPI();
        } else {
            // Redireccionar
            navigate('/iniciar-sesion');
        }
    // }, []);                     // [] - Ejecuta solo una vez
    }, [clientes]);             // [clientes] - Ejecuta cada vez que clientes cambia

    // Validar el auth
    if (!auth.auth) return navigate('/iniciar-sesion');

    // Mostrar spinner
    if (!clientes.length) return <Spinner />;

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