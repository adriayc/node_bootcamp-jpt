exports.formularioNuevoVacante = (req, res) => {
    // res.send('Formulario nuevo vacante');
    res.render('nueva-vacante', {
        npmbrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
};