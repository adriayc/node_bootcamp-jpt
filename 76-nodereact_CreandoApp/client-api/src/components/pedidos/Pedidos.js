import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Cliente axios
import clienteAxios from '../../config/axios';
// Contexts
import CrmContext from '../../context/CrmContent';
// Components
import DetallesPedido from './DetallesPedidos';

const Pedidos = () => {
  // Definir el context CrmContext
  const { auth } = useContext(CrmContext);

  const navigate = useNavigate();

  // Hook useState
  const [pedidos, guardarPedidos] = useState([]);

  // Hook useEffect
  useEffect(() => {
    if (auth.auth !== '') {
      const consultarAPI = async () => {
        try {
          // Obtener los pedidos
          const resultado = await clienteAxios.get('/pedidos', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });
          // console.log(resultado.data);
    
          // Guardar en el state
          guardarPedidos(resultado.data);

        } catch (error) {
          // console.log(error);

          if (error.response.status === 500) {
            // Redireccionar
            navigate('/iniciar-sesion');
          }
        }
      };
  
      // Llamar la funcion
      consultarAPI();
    } else {
      // Redireccionar
      navigate('/iniciar-sesion');
    }

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