// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    // console.log('Cambiando estado...');
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');

    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad);
    });

    function cambiarEstadoPropiedad (e) {
        // console.log('Presionando boton...');
        // console.log(e.target.dataset);

        const { propiedadId: id } = e.target.dataset;
        console.log(id);
    }

})();