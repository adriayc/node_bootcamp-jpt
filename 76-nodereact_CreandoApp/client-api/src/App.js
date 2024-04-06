import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context
// import { CrmContext, CrmProvider } from './context/CrmContent';
import { CrmProvider } from './context/CrmContent';
// Components
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';
import Login from './components/auth/Login';

function App() {
  // Definir useContext
  // const [auth, guardarAuth] = useContext(CrmContext); 

  return (
    <Router>
      <Fragment>
        {/* <CrmProvider value={[auth, guardarAuth]}> */}
        <CrmProvider>
          {/* Call component */}
          <Header />

          <div className='contenedor grid contenido-principal'>
            <Navegacion />

            <main className="caja-contenido col-9">
              {/* Routing a los diferentes componentes */}
              <Routes>
                <Route path='/' element={<Clientes />} />
                <Route path='/clientes/nuevo' element={<NuevoCliente />} />
                <Route path='/clientes/editar/:id' element={<EditarCliente />} />

                <Route path='/productos' element={<Productos />} />
                <Route path='/productos/nuevo' element={<NuevoProducto />} />
                <Route path='/productos/editar/:id' element={<EditarProducto />} />

                <Route path='/pedidos' element={<Pedidos />} />
                <Route path='/pedidos/nuevo/:clientId' element={<NuevoPedido />} />

                <Route path='/iniciar-sesion' element={<Login />} />
              </Routes>
            </main>
          </div>
        </CrmProvider>
      </Fragment>
    </Router>

    // <>
    //   {/* Call component */}
    //   <Header />
    // </>

  );
}

export default App;
