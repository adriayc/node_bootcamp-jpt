module.exports = {
    seleccionarSkills: (seleccionadas = [], opciones) => {
        // console.log(seleccionadas);
        console.log(opciones.fn());

        const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

        let html = '';
        skills.forEach(skill => {
            html += `<li ${seleccionadas.includes(skill) ? 'class="activo"' : ''}>${skill}</li>`;
        })

        return opciones.fn().html = html;
    },
    tipoContrato: (seleccionado, opciones) => {
        // console.log(seleccionado);
        // console.log(opciones.fn());
        // console.log(opciones.fn(this));

        return opciones.fn(this).replace(
            // Inyecta el select en valor que esta seleccionado
            new RegExp(`value="${seleccionado}"`), '$& selected="selected"'
        );
    },
    mostrarAlertas: (errores = {}, alertas) => {
        // console.log(errores);
        // console.log(alertas.fn());

        const categoria = Object.keys(errores);
        // console.log(categoria);
        // console.log(errores[categoria]);

        let html = '';
        if (categoria.length) {
            errores[categoria].forEach(error => {
                html += `
                    <div class="${categoria} alerta">
                        ${error}
                    </div>
                `;
            });
        }
        // console.log(html);

        return alertas.fn().html = html;
    }
};