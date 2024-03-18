import axios from 'axios';
import Swal from 'sweetalert2';
// alert('Webpack!');

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    if (skills) {
        skills.addEventListener('click', agregarSkills);

        // Llamar la funcion cuando estemos en el formulario de editar
        skillsSeleccionados();
    }

    // Limpiar las alertas
    let alertas = document.querySelector('.alertas');

    if (alertas) {
        limpiarAlertas();
    }

    // Eliminar vacante
    const vacanteListado = document.querySelector('.panel-administracion');

    if (vacanteListado) {
        vacanteListado.addEventListener('click', accionesListado);
    }
});

const skills = new Set();

const agregarSkills = e => {
    // console.log(e.target);

    if (e.target.tagName === 'LI') {
        // console.log('Si');
        // console.log(e.target.textContent);

        if (e.target.classList.contains('activo')) {
            // Quitar del set y quitar tambien su class
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        } else {
            // Agregar al set y agregar tambien la class
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    } /*else {
        console.log('No');
    }*/

    // console.log(skills);

    // Convertir a un array el set de skills
    const skillsArray = [...skills];
    // Insertar skillsArray a un input de tipo hidden
    document.querySelector('#skills').value = skillsArray;
};

const skillsSeleccionados = () => {
    // const seleccionadas = document.querySelectorAll('.lista-conocimientos .activo');                // NodeList
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));    // Convertir NodeList a Array
    // console.log(seleccionadas);

    seleccionadas.forEach(seleccionada => {
        skills.add(seleccionada.textContent);
    });

    // Convertir a un array el set de skills
    const skillsArray = [...skills];
    // Inyectar skillsArray a un input de tipo hidden
    document.querySelector('#skills').value = skillsArray;
};

const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas');

    const interval = setInterval(() => {
        if (alertas.children.length > 0) {
            // Remover las alertas
            alertas.removeChild(alertas.children[0]);
        } else if (alertas.children.length === 0) {
            alertas.parentElement.removeChild(alertas);
            // Remover el interval
            clearInterval(interval);
        }
    }, 2000);
};

// Eliminar vacantes
const accionesListado = e => {
    e.preventDefault();
    // console.log(e.target);

    if (e.target.dataset.eliminar) {
        // console.log('Eliminando...');
        // Eliminar por medio de axios

        Swal.fire({
            title: "¿Confirmar eliminación?",
            text: "¡Una vez eliminida, no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la peticion con axios
                const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`;

                // Axios para eliminar el registro
                axios.delete(url, {params: {url}})
                    .then(function (respuesta) {
                        // console.log(respuesta);
                        // return;
                        if (respuesta.status === 200) {
                            Swal.fire({
                                title: "¡Eliminado!",
                                text: respuesta.data,
                                icon: "success"
                            });

                            // TODO: Eliminar del DOM
                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                        }
                    });
            }
          }).catch(() => {
            Swal.fire({
                title: '¡Hubo un error!',
                text: 'No se pudo eliminar',
                icon: 'error'
            });
          });

    } else if (e.target.tagName === 'A') {
        window.location.href = e.target.href;
    }
};