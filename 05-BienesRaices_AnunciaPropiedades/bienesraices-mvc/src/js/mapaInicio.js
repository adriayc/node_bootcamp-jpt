// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    const lat = -17.377221;
    const lng = -66.1570064;

    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Obtener propiedades en formato JSON
    const obtenerPropiedades = async () => {
        try {
            // URL de la peticion (no requiere http://localhost:3000 o https://dominio por que se encuentra en el mismo host)
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            const propiedades = await respuesta.json();
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

        propiedades.forEach(propiedad => {
            // Agregar los pines
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup('Información aqui');

            // Permite que los resultados (marker) que no coincidan se eliminen 
            markers.addLayer(marker);
        });
    }

})();