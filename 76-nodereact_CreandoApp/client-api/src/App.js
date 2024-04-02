import { Fragment } from 'react';
// Components
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

function App() {
  return (
    // <>
    //   {/* Call component */}
    //   <Header />
    // </>

    <Fragment>
      {/* Call component */}
      <Header />

      <div className='contenedor grid contenido-principal'>
        <Navegacion />

        <main className='caja-contenido col-9'>
          {/* TODO: Routing a los diferentes Componentes */}
        </main>
      </div>
    </Fragment>
  );
}

export default App;
