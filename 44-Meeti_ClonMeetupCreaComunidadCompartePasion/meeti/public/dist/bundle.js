/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ (() => {

eval("// console.log('Hello world Webpack!');\n\n// IIFE (Immediately Invoked Funcion expresssion)\n(function () {\n  // const map = L.map('mapa').setView([51.505, -0.09], 13);\n\n  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n  //     attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n  // }).addTo(map);\n\n  // L.marker([51.5, -0.09]).addTo(map)\n  //     .bindPopup('A pretty CSS popup.<br> Easily customizable.')\n  //     .openPopup();\n\n  document.addEventListener('DOMContentLoaded', function (event) {\n    var mapa = document.querySelector('#mapa');\n    if (mapa) {\n      var map = L.map('mapa').setView([51.505, -0.09], 13);\n      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n      }).addTo(map);\n      L.marker([51.5, -0.09]).addTo(map).bindPopup('A pretty CSS popup.<br> Easily customizable.').openPopup();\n    }\n  });\n})();\n\n//# sourceURL=webpack://meeti/./public/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/app.js"]();
/******/ 	
/******/ })()
;