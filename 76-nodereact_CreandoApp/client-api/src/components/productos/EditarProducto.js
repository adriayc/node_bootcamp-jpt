import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';
// Components
import Spinner from '../layout/Spinner';

const EditarProducto = () => {
  // Obtener el ID (Query params)
  const { id } = useParams();

  // Hoosk useState
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });
  const [archivo, guardarArchivo] = useState('');

  // Hook useEffect
  useEffect(() => {
    // Obtener el produto por el ID
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      // console.log(productoConsulta.data);

      // Guardar en el state
      guardarProducto(productoConsulta.data);
    };

    // Llamar la funcion
    consultarAPI();

  }, [])

  // Leer los datos (nombre y precio) del formulario
  const actualizarProductoState = e => {
    // Guardar en el state producto
    guardarProducto({
      // Copiar del state actual
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  // Leer el dato imagen del formulario
  const actualizarArchivoState = e => {
    // Guardar en el state archivo ()
    guardarArchivo(e.target.files[0]);
  };

  // Validar formulario
  // const validarCliente = () => {
  //   // Destructuring del objeto cliente
  //   const { nombre, precio } = producto;
  //   console.log(nombre.length);

  //   // Validar el contenido de las propiedades
  //   let valido = !nombre.length || !precio.length;

  //   return valido;
  // };

  if (!producto.nombre) return <Spinner />;

  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre" 
            onChange={actualizarProductoState}
            defaultValue={producto.nombre}
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
            defaultValue={producto.precio}
          />
        </div>

        <div className='campo'>
          {producto.imagen ? (
              <img src={`http://localhost:5000/${producto.imagen}`} alt='' width="200" />
            ) : null}
        </div>
    
        <div className="campo">
          <label>Imagen:</label>
          {/* {producto.imagen ? (
            <img src={`http://localhost:5000/${producto.imagen}`} alt='' width="300" />
          ) : null} */}
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
            // disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
 
export default EditarProducto;