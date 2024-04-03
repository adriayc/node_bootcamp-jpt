import { Fragment, useState } from 'react';

const NuevoProducto = () => {
  // Hook useState
  const [producto, guardProducto] = useState({
    nombre: '',
    precio: ''
  });
  const [archivo, guardarArchivo] = useState('');

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Producto" name="nombre" />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" />
        </div>
    
        <div className="campo">
          <label>Imagen:</label>
          <input type="file"  name="imagen" />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  );
}
 
export default NuevoProducto;