import axios from 'axios';
import Swal from 'sweetalert2';

// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        // Obtener todos los forms de eliminar
        const formsEliminar = document.querySelectorAll('.eliminar-comentario');

        // Validar que existan
        if (formsEliminar.length > 0) {
            formsEliminar.forEach(form => {
                form.addEventListener('submit', eliminarComenario)
            });
        }
    });

    function eliminarComenario(e) {
        e.preventDefault();
        // console.log(this.action);

        axios.post(this.action)
            .then(respuesta => {
                console.log(respuesta);
            })
    }

})();