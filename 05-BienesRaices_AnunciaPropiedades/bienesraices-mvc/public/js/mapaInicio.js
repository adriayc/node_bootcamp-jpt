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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// IIFE (Immediately Invoked Funcion expresssion)\n(function () {\n    const lat = -17.377221;\n    const lng = -66.1570064;\n\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);\n\n    let markers = new L.FeatureGroup().addTo(mapa);\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    // Obtener propiedades en formato JSON\n    const obtenerPropiedades = async () => {\n        try {\n            // URL de la peticion (no requiere http://localhost:3000 o https://dominio por que se encuentra en el mismo host)\n            const url = '/api/propiedades';\n            const respuesta = await fetch(url);\n            const propiedades = await respuesta.json();\n            // console.log(respuesta);\n            // console.log(propiedades);\n\n            mostrarPropiedades(propiedades);\n\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    // Llamar la funcion para obtener propiedades\n    obtenerPropiedades();\n    \n    const mostrarPropiedades = propiedades => {\n        // console.log(propiedades);\n\n        propiedades.forEach(propiedad => {\n            // Agregar los pines\n            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\n                autoPan: true\n            })\n            .addTo(mapa)\n            .bindPopup('Información aqui');\n\n            // Permite que los resultados (marker) que no coincidan se eliminen \n            markers.addLayer(marker);\n        });\n    }\n\n})();\n\n//# sourceURL=webpack://bienesraices-mvc/./src/js/mapaInicio.js?");

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
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;