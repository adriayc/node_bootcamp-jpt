import { Link } from "react-router-dom";

const Producto = ({producto}) => {
  // console.log(producto);

  // Destructuring del objeto producto
  const { _id, nombre, precio, imagen } = producto;

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
        <Link to={`/producto/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button 
          type="button" 
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}
 
export default Producto;