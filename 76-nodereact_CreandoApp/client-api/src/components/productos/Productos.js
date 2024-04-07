import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ClientesAxios
import clienteAxios from '../../config/axios';
// Contexts
import CrmContext from '../../context/CrmContent';
// Components
import Spinner from '../layout/Spinner';
import Producto from './Producto';

const Productos = () => {
  // Definir el context CrmContext
  const { auth } = useContext(CrmContext);

  const navigate = useNavigate();

  // Hook useState
  const [productos, guardarProductos] = useState([]);

  // Hook useState
  useEffect(() => {
    if (auth.token !== '') {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const productoConsulta = await clienteAxios.get('/productos', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });
          // console.log(productoConsulta.data);
  
          guardarProductos(productoConsulta.data);

        } catch (error) {
          // console.log(error);

          if (error.response.status === 500) {
            // Redireccionar
            navigate('/iniciar-sesion');
          }
        }
      };

      // Llamar a la funcion
      consultarAPI();
    } else {
      // Redireccionar
      navigate('/iniciar-sesion');
    }
  }, [productos]);            // [productos]: se ejecutar cuando exista un cambio en productos

  // Validar el auth
  if (!auth.auth) return navigate('/iniciar-sesion');

  // Mostrar spinner
  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Productos</h2>

      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map(producto => (
          <Producto 
            key={producto._id}
            producto={producto}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;