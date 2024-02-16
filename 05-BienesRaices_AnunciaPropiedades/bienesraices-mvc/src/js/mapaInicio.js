// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    const lat = -17.377221;
    const lng = -66.1570064;

    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa);
    // console.log(markers);

    let propiedades =[];

    // Filtros
    const filtros = {
        categoria: '',
        precio: ''
    };

    const categoriaSelect = document.querySelector('#categorias');
    const precioSelect = document.querySelector('#precios');

    // Filtrado de Categorias y Precios
    categoriaSelect.addEventListener('change', e => {
        // console.log(e.target.value);     // valor de tipo string
        // console.log(typeof e.target.value);

        // +valor_string convierte el string en number
        filtros.categoria = +e.target.value;

        // Filtar
        filtrarPropiedades();
    });

    precioSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value;
        
        // Filtrar
        filtrarPropiedades();
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Obtener propiedades en formato JSON
    const obtenerPropiedades = async () => {
        try {
            // URL de la peticion (no requiere http://localhost:3000 o https://dominio por que se encuentra en el mismo host)
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            // const propiedades = await respuesta.json();
            propiedades = await respuesta.json();
            // console.log(respuesta);
            // console.log(propiedades);

            mostrarPropiedades(propiedades);

        } catch (error) {
            console.log(error);
        }
    };
    // Llamar la funcion para obtener propiedades
    obtenerPropiedades();
    
    const mostrarPropiedades = propiedades => {
        // console.log(propiedades);

        // Limpiar los markers previos
        markers.clearLayers();

        propiedades.forEach(propiedad => {
            // console.log(propiedad);
            // Agregar los pines
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad?.categoria?.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
                <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad?.titulo}" />
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase text-white">Ver Propiedad</a>
            `);

            // Permite que los resultados (marker) que no coincidan se eliminen 
            markers.addLayer(marker);
        });
    }

    const filtrarPropiedades = () => {
        // console.log('Filtrando...');
        // console.log(propiedades);

        // chaining de filters (array methods)
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio);
        // console.log(resultado);

        mostrarPropiedades(resultado);
    };

    // const filtrarCategoria = propiedad => {
    //     // console.log(propiedad);

    //     // Retornar si existe un valor en categorio en el objeto filtros
    //     return filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad;
    // };
    const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad;

    const filtrarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad;

})();