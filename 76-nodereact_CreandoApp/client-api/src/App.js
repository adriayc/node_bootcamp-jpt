import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

import Clientes from './components/clientes/Clientes';
import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';

function App() {
  return (
    <Router>
      <Fragment>
        {/* Call component */}
        <Header />

        <div className='contenedor grid contenido-principal'>
          <Navegacion />

          <main className="caja-contenido col-9">
            {/* Routing a los diferentes componentes */}
            <Routes>
              <Route path='/' element={<Clientes />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/pedidos' element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>

    // <>
    //   {/* Call component */}
    //   <Header />
    // </>

  );
}

export default App;
