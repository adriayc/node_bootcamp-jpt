import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';

const EditarProducto = () => {
  // Obtener el ID (Query params)
  const { id } = useParams();

  // Hoosk useState
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });

  // Hook useEffect
  useEffect(() => {
    // Obtener el produto por el ID
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      console.log(productoConsulta.data);

      // Guardar en el state
      guardarProducto(productoConsulta.data);
    };

    // Llamar la funcion
    consultarAPI();

  }, [])


  return (
    <Fragment>
      <h2>Editar Producto</h2>
    </Fragment>
  );
}
 
export default EditarProducto;