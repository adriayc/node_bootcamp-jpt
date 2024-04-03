import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ClienteAxios
import clienteAxios from "../../config/axios";

const EditarCliente = () => {
  // Obtener params ID
  const { id } = useParams();
  // console.log(id);

  // Hook state
  const [cliente, guadarCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  // Obtener el cliente a partir del ID
  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
    // console.log(clienteConsulta.data);

    // Agregar al state
    guadarCliente(clienteConsulta.data);
  };

  // Hook useEffect
  useEffect(() => {
    consultarAPI();
  }, []);

  // Leer los datos del formulario
  const actualizarState = e => {
    // Almacenar el valor en el state
    guadarCliente({
      // Copia del state actual
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  // Validar formulario
  const validarCliente = () => {
    // Destructuring del objeto cliente
    const { nombre, apellido, email, empresa, telefono } = cliente;

    // Validar el contenido de las propiedades
    let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

    return valido;
  };

  return (
    <Fragment>
      <h2>Editar Cliente</h2>

      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre" 
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente" 
            name="apellido" 
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>
    
        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text" 
            placeholder="Empresa Cliente" 
            name="empresa" 
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email Cliente" 
            name="email" 
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="email" 
            placeholder="Teléfono Cliente" 
            name="telefono" 
            onChange={actualizarState}
            value={cliente.telefono}  
          />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Guardar Cambios" 
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
 
export default EditarCliente;