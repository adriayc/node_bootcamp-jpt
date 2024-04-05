import { Fragment, useEffect, useState } from 'react';
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

  }, [])

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido 
            key={pedido._id}
            pedido={pedido}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Pedidos;