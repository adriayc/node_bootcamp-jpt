import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ClientesAxios
import clienteAxios from '../../config/axios';

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
        <li className="producto">
          <div className="info-producto">
            <p className="nombre">VueJS</p>
            <p className="precio">$25.00 </p>
            <img src="img/1.jpg" />
          </div>
          <div className="acciones">
            <a href="#" className="btn btn-azul">
              <i className="fas fa-pen-alt"></i>
              Editar Producto
            </a>

            <button type="button" className="btn btn-rojo btn-eliminar">
              <i className="fas fa-times"></i>
              Eliminar Cliente
            </button>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default Productos;