// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    const lat = -17.377221;
    const lng = -66.1570064;

    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
})();