import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
// ClienteAxios
import clienteAxios from '../../config/axios';
// Contexts
import CrmContext from '../../context/CrmContent';
import { useContext } from "react";

const Cliente = ({cliente}) => {
    // Definir el context CrmContext
    const { auth } = useContext(CrmContext);

    const navigate = useNavigate();

    // console.log(cliente);
    // Destructuring del cliente
    const { _id, nombre, apellido, empresa, email, telefono } = cliente;  

    // Eliminar un cliente de la API REST (Backend)
    const eliminarCliente = id => {
        // console.log('Eliminando...');
        // console.log(id);

        Swal.fire({
            title: "¿Estas seguro de eliminar?",
            text: "¡El cliente eliminado no puede recurerar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Si eliminarlo!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la petición por el clienteAxios
                clienteAxios.delete(`/clientes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        // console.log(res);

                        // Mostrar alerta
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: res.data.mensaje,
                            icon: "success"
                        });
                    });
            }
          });
    }

    // Validar token
    if (!auth.auth) return navigate('/iniciar-sesion');

    return (
      <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{nombre} {apellido}</p>
            <p className="empresa">{empresa}</p>
            <p>{email}</p>
            <p>Tel: {telefono}</p>
        </div>
        <div className="acciones">
            <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                <i className="fas fa-plus"></i>
                Nuevo Pedido
            </Link>
            <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                // Se ejecuta la fn cuando ocurre un evento
                onClick={() => eliminarCliente(_id)}
            >
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
      </li>
    );
}
 
export default Cliente;