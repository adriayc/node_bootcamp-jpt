import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';

const Producto = ({producto}) => {
  // console.log(producto);

  // Destructuring del objeto producto
  const { _id, nombre, precio, imagen } = producto;

  // Eliminar un producto de la REST API (Backend)
  const eliminarProducto = id => {
    // console.log('Eliminando...');

    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "¡El producto eliminado no puede recurerar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar la petición por el clienteAxios
        clienteAxios.delete(`/productos/${id}`)
          .then(res => {
            // console.log(res);

            // Validar el status
            if (res.status === 200) {
              // Mostrar alerta
              Swal.fire({
                title: "¡Eliminado!",
                text: res.data.mensaje,
                icon: "success"
              });
            }
          });
      }
    });
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio}</p>
        {imagen ? (
          <img src={`http://localhost:5000/${imagen}`} alt="" />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button 
          type="button" 
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}
 
export default Producto;