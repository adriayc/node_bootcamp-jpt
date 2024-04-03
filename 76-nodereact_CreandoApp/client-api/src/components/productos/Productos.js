import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ClientesAxios
import clienteAxios from '../../config/axios';
// Components
import Producto from './Producto';

const Productos = () => {
  // Hook useState
  const [productos, guardarProductos] = useState([]);

  // Hook useState
  useEffect(() => {
    // Query a la API
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get('/productos');
      // console.log(productoConsulta.data);

      guardarProductos(productoConsulta.data);
    };

    // Llamar a la funcion
    consultarAPI();
  }, []);

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