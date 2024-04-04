import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// Cliente Axios
import clienteAxios from '../../config/axios';
// Components
import FormBuscarProducto from './FormBuscarProducto';

const NuevoPedido = () => {
  // Obtener el ID (Query params)
  const { clientId } = useParams();
  // console.log(clientId);

  // Hook useState
  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState('');

  // Hook useEffect
  useEffect(() => {
    // Obtener cliente de la API
    const consultaAPI = async () => {
      const clienteConsulta = await clienteAxios.get(`/clientes/${clientId}`);
      // console.log(clienteConsulta.data);

      // Guardar en el state
      guardarCliente(clienteConsulta.data);
    };

    // Llamar a la funcion
    consultaAPI();
  }, []);

  // Enviar los datos del formulario
  const buscarProducto = async e => {
    e.preventDefault();

    // Obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
    // console.log(resultadoBusqueda);

    // Validar que exista al menos un resultado
    if (resultadoBusqueda.data[0]) {

    } else {
      // Mostrar alerta
      Swal.fire({
        title: "¡No hay resultados!",
        text: "No existe resultados de la busqueda",
        icon: "error"
      });
    }
  };

  // Leer datos del formulario
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  };

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto 
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}

      />

      <ul className="resumen">
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>

        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>

        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
      </ul>

      <div className="campo">
        <label>Total:</label>
        <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
      </div>
      
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </Fragment>
  );
}
 
export default NuevoPedido;