import { Fragment, useState } from 'react';

const NuevoProducto = () => {
  // Hook useState
  const [producto, guardProducto] = useState({
    nombre: '',
    precio: ''
  });
  const [archivo, guardarArchivo] = useState('');

  // Leer los datos (nombre y precio) del formulario
  const actualizarProductoState = e => {
    // Guardar en el state producto
    guardProducto({
      // Copiar del state actual
      ...producto,
      [e.target.name]: e.target.value
    });
    // console.log(producto);
  };

  // Leer el dato imagen del formulario
  const actualizarArchivoState = e => {
    // console.log(e.target.files);
    // console.log(e.target.files[0]);

    // Guardar en el state archivo ()
    guardarArchivo(e.target.files[0]);
  };

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre" 
            onChange={actualizarProductoState}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input 
            type="number" 
            name="precio" 
            min="0.00" 
            step="0.01" 
            placeholder="Precio" 
            onChange={actualizarProductoState}
          />
        </div>
    
        <div className="campo">
          <label>Imagen:</label>
          <input 
            type="file"  
            name="imagen" 
            onChange={actualizarArchivoState}
          />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  );
}
 
export default NuevoProducto;