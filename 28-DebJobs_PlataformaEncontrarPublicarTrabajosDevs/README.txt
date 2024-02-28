* Crear la app
    - Iniciar la app
        # npm init
            > package name: (devjobs) ENTER
            > version: (1.0.0) ENTER
            > description: Portal DevJobs con NodeJS, Handlebars, Mongoose
            > entry point: (index.js) ENTER
            > test command: ENTER
            > git repository: ENTER
            > keywords: ENTER
            > author: Adriano Ayala
            > license: (ISC) ENTER
            Is this OK? (yes) yes
        # npm start
    - Instalar dependencias
        + Express y Handlebars (Template engine)
            # npm install ---save express express-handlebars
        + Nodemon
            # npm install --save-dev nodemon
    - Instalar Mongo Compass
        + Descargar e instalar Mongo Compass https://www.mongodb.com/try/download/shell
        + Configurar MongoDB Atlas
          - Crear e iniciar sesion en MongoDB Atlas
            > Ir a 'DEPLOYMENT' | 'Database' -> 'Data Services' -> 'Build a Database' (Crear un nueva DB)
              > Dejar todo por defecto y click en 'Create'
              > Dejar todo por defecto y click en 'Finish and Close'
            > Ir a 'SECURITY' | 'Database Access' -> 'Database Users' -> click en 'Edit' (Actualizar el password)
            > Ir a 'DEPLOYMENT' | 'Data Services' -> click en 'Connect' -> 'Compass'
              > Copiar la cadena de conexion 'mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/' para crear una nueva conexion con MongoDB Compass
        + MongoDB Compass
          - Configurar una nueva conexion
            > URI: Pegar la cadena de conexion 'mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/' de Mongo Atlas y click en 'Connect' (Ingresar el password de authenticacion)
          - Ir a 'Databases' -> click en 'Create database'
            > Database Name: devjobs
            > Collection Name: vacantes
            > Click en 'Create Database'
