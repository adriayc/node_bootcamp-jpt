// import { Link } from 'react-router-dom';

const DetallesPedido = ({pedido}) => {
  // console.log(pedido);  

  // Destructuring del objeto pedido
  const { cliente } = pedido;

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {cliente._id}</p>
        <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {pedido.pedido.map(articulo => (
              <li
                key={articulo._id}
              >
                <p>{articulo.producto.nombre}</p>
                <p>Precio: ${articulo.producto.precio}</p>
                <p>Cantidad: {articulo.cantidad}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="total">Total: ${pedido.total}</p>
      </div>

      <div className="acciones">
        {/* <Link href="#" className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Pedido
        </Link> */}

        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
}
 
export default DetallesPedido;