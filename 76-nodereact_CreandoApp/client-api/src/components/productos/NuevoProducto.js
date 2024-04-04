import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';

const NuevoProducto = () => {
  const navigate = useNavigate();

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

  // Actualiza el producto en la REST APIs (Backend)
  const actualizarProducto = async e => {
    e.preventDefault();

    // Crear un form-data
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // Guardar en la DB
    try {
      const resultado = await clienteAxios.post('/productos', formData, {
        // Config del headers
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(resultado);

      // Validar el status
      if (resultado.status === 200) {
        // Mostrar alerta
        Swal.fire({
          title: "¡Producto agregado!",
          text: resultado.data.mensaje,
          icon: "success"
        });
      }

      // Redireccionar
      return navigate('/productos');
      
    } catch (error) {
      console.log(error);

      // Mostrar alerta
      Swal.fire({
        title: "¡Errror!",
        text: "Hubo un error. Vuelve a intentarlo",
        icon: "error"
      });
    }
  };

  // Validar formulario
  const validarCliente = () => {
    // Destructuring del objeto cliente
    const { nombre, precio } = producto;

    // Validar el contenido de las propiedades
    let valido = !nombre.length || !precio.length;

    return valido;
  };

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form
        onSubmit={actualizarProducto}
      >
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
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Agregar Producto" 
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
 
export default NuevoProducto;