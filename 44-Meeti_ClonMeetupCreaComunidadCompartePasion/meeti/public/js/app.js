// console.log('Hello world Webpack!');

import { OpenStreetMapProvider } from 'leaflet-geosearch';

// IIFE (Immediately Invoked Funcion expresssion)
(function () {

    // const map = L.map('mapa').setView([51.505, -0.09], 13);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // L.marker([51.5, -0.09]).addTo(map)
    //     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    //     .openPopup();


    // Copiar la lat y lng de la URL de google maps
    // https://www.google.com/maps/place/Nadine+Import+SRL+Konica+Minolta/@-17.377221,-66.1570064,3a,75y,92.01h,92.97t

    let map;
    const lat = -17.377221;
    const lng = -66.1570064;
    let markers;
    let marker;

    document.addEventListener('DOMContentLoaded', event => {
        const mapa = document.querySelector('#mapa');
    
        if (mapa) {
            // const map = L.map('mapa').setView([51.505, -0.09], 13);
            // const map = L.map('mapa').setView([lat, lng], 15);
            map = L.map('mapa').setView([lat, lng], 15);
            // Contenedor para todos los marker
            markers = new L.FeatureGroup().addTo(map);
    
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            // L.marker([51.5, -0.09]).addTo(map)
            //     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            //     .openPopup();

            // Buscar la direccion
            const buscador = document.querySelector('#formbuscador');
            buscador.addEventListener('input', buscarDireccion);
        }
    });

    // Metodo para buscar la direccion
    function buscarDireccion(e) {
        // console.log(e.target.value);

        if (e.target.value.length > 8) {
            // console.log('Buscando...');

            // Si existe un pin anterior limpiarlo
            markers.clearLayers();

            // Iniciarlizar el geocoder
            const geocodeService = L.esri.Geocoding.reverseGeocode();
            // Utilizar el provider de leaflet-geosearch
            const provider = new OpenStreetMapProvider();
            // console.log(provider);
            provider.search({query: e.target.value}).then(resultado => {
                // console.log(resultado);
                // console.log(resultado[0].bounds[0]);

                // geocodeService.reverse().latlng(resultado[0].bounds[0], 15).run(function(error, result) {            // Error!
                geocodeService.latlng(resultado[0].bounds[0], 15).run(function(error, result) {
                    // console.log(result);

                    llenarInputs(result);

                    // Mostrar el mapa
                    map.setView(resultado[0]?.bounds[0], 15);

                    // Agregar el pin
                    marker = new L.marker(resultado[0]?.bounds[0], {
                        draggable: true,                // Mover el pin
                        autoPan: true                   // Mover el mapa segun la posicion del pin
                    })
                    .addTo(map)
                    // Mostrar popup de informacion
                    .bindPopup(resultado[0]?.label)
                    .openPopup();

                    // Asignar al contenedor de markers
                    markers.addLayer(marker);

                    // Detectar movimiento del marker en el mapa
                    marker.on('moveend', function(e) {
                        // console.log(e.target);

                        marker = e.target;
                        // console.log(marker.getLatLng());
                        const posicion = marker.getLatLng();
                        // Centrar el mapa a la posicion del pin
                        map.panTo(new L.LatLng(posicion.lat, posicion.lng));

                        // Reverse geocoding, cuando el usuario reubica el pin
                        // geocodeService.reverse().latlng(posicion, 15).run(function(error, result) {      // Error!
                        geocodeService.latlng(posicion, 15).run(function(error, result) {
                            // console.log(result);

                            llenarInputs(result);

                            // Mostrar el popup de informacion
                            marker.bindPopup(result?.address?.LongLabel);
                        });
                    });
                });
            });
        }
    }

    function llenarInputs(resultado) {
        console.log(resultado);

        document.querySelector('#direccion').value = resultado.address.Address || '';
        document.querySelector('#ciudad').value = resultado.address.City || '';
        document.querySelector('#estado').value = resultado.address.Region || '';
        document.querySelector('#pais').value = resultado.address.CntryName || '';
        document.querySelector('#codigo-pais').value = resultado.address.CountryCode || '';
        document.querySelector('#lat').value = resultado.latlng.lat || '';
        document.querySelector('#lng').value = resultado.latlng.lng || '';
    }

})();