import axios from 'axios';

// IIFE (Immediately Invoked Funcion expresssion)
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const asistencia = document.querySelector('#confirmar-asistencia');
        if (asistencia) {
            asistencia.addEventListener('submit', confirmarAsistencia);
        }
    });

    function confirmarAsistencia(e) {
        e.preventDefault();
        // console.log(this);

        const btn = document.querySelector('#confirmar-asistencia input[type="submit"]');
        let accion = document.querySelector('#accion').value;
        const mensaje = document.querySelector('#mensaje');

        // Limpiar la respuesta previa del mensaje
        while (mensaje.firstChild) {
            mensaje.removeChild(mensaje.firstChild);
        }

        // Datos
        const datos = {
            accion
        };

        axios.post(this.action, datos)
            .then(respuesta => {
                // console.log(respuesta);

                if (accion === 'confirmar') {
                    document.querySelector('#accion').value = 'cancelar';
                    btn.value = 'Cancelar';
                    btn.classList.remove('btn-azul');
                    btn.classList.add('btn-rojo');
                } else {
                    document.querySelector('#accion').value = 'confirmar';
                    btn.value = 'Si';
                    btn.classList.remove('btn-rojo');
                    btn.classList.add('btn-azul');
                }

                // Mostrar un mensaje
                mensaje.appendChild(document.createTextNode(respuesta.data));
            });
    }

})();