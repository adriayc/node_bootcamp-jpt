import { useContext } from "react";
import { Link } from "react-router-dom";
// Contexts
import CrmContext from "../../context/CrmContent";

const Navegacion = () => {
  // Definir el context CrmContext
  const { auth } = useContext(CrmContext);

  if (!auth.auth) return null;

  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>

      <nav className="navegacion">
        <Link to={"/"} className="clientes">Clientes</Link>
        <Link to={"/productos"} className="productos">Productos</Link>
        <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
      </nav>
    </aside>
  );
}
 
export default Navegacion;