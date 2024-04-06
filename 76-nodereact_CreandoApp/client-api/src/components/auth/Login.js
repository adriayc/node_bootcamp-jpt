import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
// Cliente axios
import clienteAxios from '../../config/axios';

const Login = () => {
  const navigate = useNavigate();

  // Hook useState
  const [credenciales, guardarCredenciales] = useState({
    email: '',
    password: ''
  });

  // Actualizar los valores
  const actualizarValores = e => {
    // console.log('Actualizando...');

    // Guardar en el state
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    })
  };

  // Iniciar sesion del usuario en la REST API's (Backend)
  const iniciarSesion = async e => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
      // console.log(respuesta);

      // Extraer token
      const { token } = respuesta.data;

      // Almacenarlo en LocalStorage
      localStorage.setItem('token', token);

      // Mostrar alerta
      Swal.fire({
        title: "¡Login Correcto!",
        text: 'Has iniciado sesion correctamente',
        icon: "success"
      });

      // Redireccionar
      navigate('/')
      
    } catch (error) {
      console.log(error);

      // Mostrar alerta
      Swal.fire({
        title: "¡Error!",
        text: error.response.data.mensaje,
        icon: "error"
      });
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>

      <div className="contenedor-formulario">
        <form
          onSubmit={iniciarSesion}
        >
          <div className="campo">
            <label>Email</label>
            <input 
              type="text" 
              name="email" 
              placeholder="Ingrese su email" 
              required 
              onChange={actualizarValores}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Ingrese su password" 
              required 
              onChange={actualizarValores}
            />
          </div>

          <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
        </form>
      </div>
    </div>
  );
}
 
export default Login;