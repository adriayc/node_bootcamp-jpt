// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    // console.log('Cambiando estado...');
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');

    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad);
    });

    async function cambiarEstadoPropiedad (e) {
        // console.log('Presionando boton...');
        // console.log(e.target.dataset);

        const { propiedadId: id } = e.target.dataset;
        // console.log(id);

        try {
            const url = `/propiedades/${id}`;

            // Fetch API - PUT
            const respuesta = await fetch(url, {
                method: 'PUT'
            });
            console.log(respuesta);

        } catch (error) {
            console.log(error);
        }
    }

})();