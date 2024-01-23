// console.log('Soy el mapa...');

(function() {
    // Copiar la lat y lng de la URL de google maps
    // https://www.google.com/maps/place/Nadine+Import+SRL+Konica+Minolta/@-17.377221,-66.1570064,3a,75y,92.01h,92.97t

    // const lat = 20.67444163271174;
    // const lng = -103.38739216304566;
    // Nuestra posicion
    const lat = -17.377221;
    const lng = -66.1570064;
    const mapa = L.map('mapa').setView([lat, lng ], 16); 
    let marker;

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
    });

})();