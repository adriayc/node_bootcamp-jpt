import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contexts
import CrmContext from "../../context/CrmContent";

// Component
// const Header = () => {
//   return (
//     <header className="barra">
//       <div className="contenedor">
//         <h1>CRM - Administrador de CLientes</h1>
//       </div>
//     </header>
//   );
// };

// Component
const Header = () => {
  // Definir el context CrmContext
  const { auth, guardarAuth } = useContext(CrmContext);

  const navigate = useNavigate();

  // Cerrar sesión
  const cerrarSesion = () => {
    // console.log('Cerrando sesión...');

    // Actualizar el state del context
    guardarAuth({
      token: '',
      auth: false
    });

    // Eliminar token del LocalStorage
    localStorage.removeItem('token');

    // Redireccionar
    navigate('/iniciar-sesion')
  };

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>

          {auth.auth ? (
            <button 
              type="button" 
              className="btn btn-rojo"
              onClick={cerrarSesion}
            >
              <i className="far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;