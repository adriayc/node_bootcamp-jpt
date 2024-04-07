import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// Cliente Axios
import clienteAxios from '../../config/axios';
// Components
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = () => {
  // Obtener el ID (Query params)
  const { clientId } = useParams();
  // console.log(clientId);

  const navigate = useNavigate();

  // Hook useState
  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState('');
  const [productos, guardarProductos] = useState([]);
  // const [total, guardarTotal] = useState(0);
  const [total, guardarTotal] = useState(1000);

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

    // Actualizar el total
    actualizarTotal();

  }, [productos]);

  // Enviar los datos del formulario
  const buscarProducto = async e => {
    e.preventDefault();

    // Obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
    // console.log(resultadoBusqueda);

    // Validar que exista al menos un resultado
    if (resultadoBusqueda.data[0]) {
      // console.log(resultadoBusqueda.data[0]);

      const productoResultado = resultadoBusqueda.data[0];
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;
      // console.log(productoResultado);

      // Guardar en el state
      guardarProductos([...productos, productoResultado]);
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

  // Sustraer la cantidad de productos
  const restartCatidadProductos = index => {
    // console.log('Sustraendo...', index);

    // Crear una copia del arreglo original
    const productosCopia = [...productos];

    // Validar la cantidad
    if (productosCopia[index].cantidad === 0) return;

    // Decrementar la cantidad
    productosCopia[index].cantidad--;

    // Actualizar el state
    guardarProductos(productosCopia);
  };

  // Adicionar la cantidad de productos
  const aniadirCatidadProductos = index => {
    // console.log('Adicionando...', index);

    // Crear una copia del arreglo original
    const productosCopia = [...productos];

    // Incrementar la cantidad
    productosCopia[index].cantidad++;

    // Actualizar el state
    guardarProductos(productosCopia);
  };

  // Actualizar el total a pagar
  const actualizarTotal = () => {
    // Validar el arreglo del productos
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }

    // Nuevo total
    let nuevoTotal = 0;

    // Iterar productos (Calcular el nuevo total)
    productos.map(producto => nuevoTotal += (producto.cantidad *producto.precio));

    // Guardar en el state
    guardarTotal(nuevoTotal);
  };

  // Eliminar un producto del state
  const eliminarProductoPedido = id => {
    // console.log('Eliminando el producto del pedido...');
    // console.log(id);

    // Filtrar los productos
    // const productosActualizado = productos.filter(producto => producto.producto !== id);
    const productosActualizado = productos.filter(producto => producto._id !== id);

    // Actualizar el state
    guardarProductos(productosActualizado);
  };

  // Guardar el pedido en la REST API's (Backend)
  const realizarPedido = async e => {
    e.preventDefault();

    // Crear el objecto
    const pedido = {
      cliente: clientId,
      pedido: productos,
      total: total
    };
    // console.log(pedido);

    // Enviar la petición por el clienteAxios
    const resultado = await clienteAxios.post('/pedidos', pedido);

    // Validar status
    if (resultado.status === 200) {
      // Mostrar alerta
      Swal.fire({
        title: "Pedigo agregado!",
        text: resultado.data.mensaje,
        icon: "success"
      });
    } else {
      // Mostrar alerta
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un error",
        icon: "error"
      });
    }

    // Redireccionar
    navigate('/pedidos')
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
        {productos.map((producto, index) => (
          <FormCantidadProducto 
            key={producto.producto}
            producto={producto}
            index={index}
            restartCatidadProductos={restartCatidadProductos}
            aniadirCatidadProductos={aniadirCatidadProductos}
            eliminarProductoPedido={eliminarProductoPedido}
          />
        ))}
      </ul>

      <p className='total'>Total a Pagar: <span>${total}</span></p>

      {total >0 ? (
        <form
          onSubmit={realizarPedido}
        >
          {/* <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
          </div> */}
          <input type="submit" value="Realizar Pedido" className="btn btn-verde btn-block" />
        </form>
      ) : null}
    </Fragment>
  );
}
 
export default NuevoPedido;