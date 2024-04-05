// const FormCantidadProducto = ({producto, aniadirCatidadProductos, restartCatidadProductoss}) => {
const FormCantidadProducto = (props) => {
  // Destructuring del props
  const {producto, restartCatidadProductos, aniadirCatidadProductos, index} = props;

  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">${producto.precio}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i 
            className="fas fa-minus"
            onClick={() => restartCatidadProductos(index)}
          ></i>
          {/* <input type="text" name="cantidad" /> */}
          <p>{producto.cantidad}</p>
          <i 
            className="fas fa-plus"
            onClick={() => aniadirCatidadProductos(index)}
          ></i>
        </div>
        <button type="button" className="btn btn-rojo">
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}
 
export default FormCantidadProducto;