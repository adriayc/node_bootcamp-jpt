import { Dropzone } from 'dropzone';

// alert('Funciona el archivo de dropzone...');

// Obtener el valor csrf del HEADER
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// console.log(token);


// Configuracion de dropzone (.imagen es el ID del formulario donde se inserta dropzone)
Dropzone.options.imagen = {
    // Modificar el texto por defecto
    dictDefaultMessage: 'Sube tus imágenes aquí',
    // Acceptar extensionces de archivos
    acceptedFile: '.png,.jpg,.jpeg',
    // Tamaño maximo del archivo en MB
    maxFilesize: 5,
    // Maximo de archivo a subir
    maxFiles: 1,
    // Cantida de archivos que estamos soportanto (Misma cantidad que maxFiles)
    parallelUploads: 1,
    // Inhabilita la subida de forma automatico (true: automatico y false: manual - presionando un btn)
    autoProcessQueue: false,
    // Agregar la opcion de eliminar
    addRemoveLinks: true,
    // Modificar el texto de la opcion de eliminar
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El limite es 1 Archivo',

    // Configuraciones del headers de dropzone
    headers: {
        // Atributo csrf para el envio token en dropzone
        'CSRF-Token': token,
    },

    paramName: 'imagen',
    init: function () {
        const dropzone = this;
        const btnPublicar = document.querySelector('#publicar');

        btnPublicar.addEventListener('click', function () {
            dropzone.processQueue()
        });

        // Eventos propios de dropzone (Queue completado)
        dropzone.on('queuecomplete', function () {
            // Validar que no exista archivos en cola
            if (dropzone.getActiveFiles().length == 0) {
                // Redirigir por JS a una pagina
                window.location.href = '/mis-propiedades';
            } 
        });
    }
};