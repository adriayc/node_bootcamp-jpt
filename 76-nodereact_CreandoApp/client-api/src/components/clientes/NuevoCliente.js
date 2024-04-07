import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';
// Contexts
import CrmContext from '../../context/CrmContent';

const NuevoCliente = () => {
  // Definir el context CrmContext
  const { auth } = useContext(CrmContext);

  const navigate = useNavigate();

  // Hook useState
  const [cliente, guardarCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  // Leer los datos del formulario
  const actualizarState = e => {
    // console.log('Escribiendo...');
    // console.log(e.target.name);
    // console.log(e.target.value);

    // Almacenar el valor en el state
    guardarCliente({
      // Copia del state actual
      ...cliente,
      [e.target.name]: e.target.value
    })
    // console.log(cliente);
  };

  // Validar formulario
  const validarCliente = () => {
    // Destructuring del objeto cliente
    const { nombre, apellido, email, empresa, telefono } = cliente;

    // Validar el contenido de las propiedades
    let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

    return valido;
  };

  // Agregar el cliente en la REST API (Backend)
  const agregarCliente = async e => {
    e.preventDefault();
    // console.log('Enviando a la rest api...');

    if (auth.auth !== '') {
      try {
        // Enviar la petición por el clienteAxios
        await clienteAxios.post('/clientes', cliente, {
          headers: {
              Authorization: `Bearer ${auth.token}`
          }
        })
        .then(res => {
          // console.log(res);

          // Validar errores
          if (res.data.code === 11000) {
            // console.log('Error, usuario duplicado en Mongo');

            // Mostrar una alerta
            Swal.fire({
              title: "¡Hubo un error!",
              text: "El cliente ya esta registrado",
              icon: "error"
            });
          } else {
            // console.log(res.data);

            // Mostrar una alerta
            Swal.fire({
              title: "¡Cliente agregado!",
              text: res.data.mensaje,
              icon: "success"
            });
          }

          // Redireccionar
          return navigate('/');

        });
      } catch (error) {
        // console.log(error);

        if (error.response.status === 500) {
          // Redireccionar
          navigate('/iniciar-sesion');
        }
      }
    } else {
      // Redireccionar
      navigate('/iniciar-sesion');
    }
  };

  // Validar auth
  // if (!auth.auth || localStorage.getItem('token') !== auth.token) return navigate('/iniciar-sesion');
  if (!auth.auth) return navigate('/iniciar-sesion');

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form
        onSubmit={agregarCliente}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre" 
            onChange={actualizarState} 
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente" 
            name="apellido" 
            onChange={actualizarState} 
          />
        </div>
    
        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text" 
            placeholder="Empresa Cliente" 
            name="empresa" 
            onChange={actualizarState} 
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email Cliente" 
            name="email" 
            onChange={actualizarState} 
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="text" 
            placeholder="Teléfono Cliente" 
            name="telefono" 
            // La funcion se llama cuando ocurre el evento
            onChange={actualizarState} 
          />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Agregar Cliente" 
            // La funcion se llama imediatamente (No espera que ocurra algun evento)
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
 
export default NuevoCliente;