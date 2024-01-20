const admin = (req, res) => {
    // res.send('Mis propiedades...');

    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    });
};

export {
    admin
};