// alert('Webpack!');

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    if (skills) {
        skills.addEventListener('click', agregarSkills);
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