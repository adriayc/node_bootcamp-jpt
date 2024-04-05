import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// Cliente axios
import clienteAxios from '../../config/axios';
// Components
import DetallesPedido from './DetallesPedidos';

const Pedidos = () => {
  // Hook useState
  const [pedidos, guardarPedidos] = useState([]);

  // Hook useEffect
  useEffect(() => {
    const consultarAPI = async () => {
      // Obtener los pedidos
      const resultado = await clienteAxios.get('/pedidos');
      // console.log(resultado.data);

      // Guardar en el state
      guardarPedidos(resultado.data);
    };

    // Llamar la funcion
    consultarAPI();

  }, [pedidos])

  // Eliminar un pedido de la REST API's (Backend)
  const eliminarProducto = id => {
    // console.log('Eliminando pedido...', id);

    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "¡El cliente eliminado no puede recurerar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
          // Enviar la petición por el clienteAxios
          clienteAxios.delete(`/pedidos/${id}`)
              .then(res => {
                  // console.log(res);

                  // Mostrar alerta
                  Swal.fire({
                      title: "¡Eliminado!",
                      text: res.data.mensaje,
                      icon: "success"
                  });
              });
      }
    });
  };

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido 
            key={pedido._id}
            pedido={pedido}
            eliminarProducto={eliminarProducto}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Pedidos;