/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// console.log('Soy el mapa...');\n\n(function() {\n    // Copiar la lat y lng de la URL de google maps\n    // https://www.google.com/maps/place/Nadine+Import+SRL+Konica+Minolta/@-17.377221,-66.1570064,3a,75y,92.01h,92.97t\n\n    // const lat = 20.67444163271174;\n    // const lng = -103.38739216304566;\n    // Nuestra posicion\n    // const lat = -17.377221;\n    const lat = document.querySelector('#lat').value || -17.377221;     // Logical OR (||) - Valida el truthy o falsy. Si el 1er valor es vacio obtiene el 2do valor por defecto\n    // const lat = document.querySelector('#lat').value ?? -17.377221;     // Nullish coalescing operator (??) - Valida NULL o undefined (NOTA: No nos sirve)\n    // const lng = -66.1570064;\n    const lng = document.querySelector('#lng').value || -66.1570064;\n    // [latitud, longitud], zoom\n    const mapa = L.map('mapa').setView([lat, lng ], 16); \n    let marker;\n\n    // Utilizar Provider y Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    // El Pin\n    marker = new L.marker([lat, lng], {\n        // Mover el Pin\n        draggable: true,\n        // Mover el Pin tambien el mapa\n        autoPan: true\n    })\n    .addTo(mapa);\n\n    // Detectar el movimiento del Pin\n    marker.on('moveend', function (e) {\n        marker = e.target;\n        // console.log(marker);\n\n        // Obtner la posicion (Lat y Lng)\n        const posicion = marker.getLatLng();\n        // console.log(posicion);\n\n        // Centrar el map en la posicion\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));\n\n        // Obtener la informacion de las calles al soltar el Pin (posicion, zoom)\n        geocodeService.reverse().latlng(posicion, 13).run(function (error, resultado) {\n            // console.log(resultado);\n\n            // Agregar al ubicacion al dar clic en el Pin\n            marker.bindPopup(resultado.address.LongLabel);\n\n            // Llenar los campos\n            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\n            document.querySelector('#calle').value = resultado?.address?.Address ?? '';\n            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\n            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\n        });\n    });\n\n})();\n\n//# sourceURL=webpack://bienesraices-mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;