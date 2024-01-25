// console.log('Soy el mapa...');

(function() {
    // Copiar la lat y lng de la URL de google maps
    // https://www.google.com/maps/place/Nadine+Import+SRL+Konica+Minolta/@-17.377221,-66.1570064,3a,75y,92.01h,92.97t

    // const lat = 20.67444163271174;
    // const lng = -103.38739216304566;
    // Nuestra posicion
    // const lat = -17.377221;
    const lat = document.querySelector('#lat').value || -17.377221;     // Logical OR (||) - Valida el truthy o falsy. Si el 1er valor es vacio obtiene el 2do valor por defecto
    // const lat = document.querySelector('#lat').value ?? -17.377221;     // Nullish coalescing operator (??) - Valida NULL o undefined (NOTA: No nos sirve)
    // const lng = -66.1570064;
    const lng = document.querySelector('#lng').value || -66.1570064;
    // [latitud, longitud], zoom
    const mapa = L.map('mapa').setView([lat, lng ], 16); 
    let marker;

    // Utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // El Pin
    marker = new L.marker([lat, lng], {
        // Mover el Pin
        draggable: true,
        // Mover el Pin tambien el mapa
        autoPan: true
    })
    .addTo(mapa);

    // Detectar el movimiento del Pin
    marker.on('moveend', function (e) {
        marker = e.target;
        // console.log(marker);

        // Obtner la posicion (Lat y Lng)
        const posicion = marker.getLatLng();
        // console.log(posicion);

        // Centrar el map en la posicion
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

        // Obtener la informacion de las calles al soltar el Pin (posicion, zoom)
        geocodeService.reverse().latlng(posicion, 13).run(function (error, resultado) {
            // console.log(resultado);

            // Agregar al ubicacion al dar clic en el Pin
            marker.bindPopup(resultado.address.LongLabel);

            // Llenar los campos
            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        });
    });

})();