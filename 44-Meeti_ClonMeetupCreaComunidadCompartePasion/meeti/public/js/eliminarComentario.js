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
        // console.log(this.children);

        Swal.fire({
            title: "¿Eliminar Comentario?",
            text: "¡Un comentario eliminado no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!",
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // Obtener el valor del input tipo hidden
                const comentarioId = this.children[0].value;
                // console.log(comentarioId);

                // Data
                const datos = {
                    comentarioId
                };

                // Solitar la solicitud post con axios
                axios.post(this.action, datos)
                .then(respuesta => {
                    // console.log(respuesta);

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: respuesta.data,
                        icon: "success"
                    });

                    // Eliminar el comentario del DOM
                    this.parentElement.parentElement.remove();
                }).catch(error => {
                    // console.log(error.response);

                    Swal.fire({
                        title: '¡Error!',
                        text: error.response.data,
                        icon: 'error'
                    });
                });
            }
          });
    }

})();