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
        + Dotenv, Connect-Mongo, Mongoose, Short-Id, Slug y Cookie-Parser
            # npm install --save dotenv connect-mongo mongoose shortid slug session cookie-parser
        + Express session
            # npm install --save express-session
        + Webpack
            # npm install --save-dev @babel/core @babel/preset-env babel-loader webpack webpack-cli
        + Concurrently (Ejecutar varios comandos simultaneamente)
            # npm install --save concurrently
        + Bcrypt (Hashear los passowords)
            # npm install --save bcrypt
        + Connect-Flash y Express-Validator
            # npm install --save connect-flash express-validator                (Last version)
            # npm install --save connect-flash express-validator@5.3.0          (App version)
        + Passport y Passport-Local
            # npm install --save passport passport-local
        + Axios
            # npm install --save axios
        + SweetAlert2
            # npm install --save sweetalert2
        + Multer (Subir archivos)
            # npm install --save multer
        + Nodemailer (Envio de emails)
            # npm install --save nodemailer nodemailer-express-handlebars
        + Http-Errors
            # npm install --save http-errors
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
            > Ir Ir a 'DEPLOYMENT' | 'Data Services' -> click en 'Connect' -> 'Drivers'
              > Driver: Nodo.js
              > Version: 5.5 or later
              > Copiar la cadena de conexion 'mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' para conectar a la app
        + MongoDB Compass
          - Configurar una nueva conexion
            > URI: Pegar la cadena de conexion 'mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/' de Mongo Atlas y click en 'Connect' (Ingresar el password de authenticacion)
          - Ir a 'Databases' -> click en 'Create database'
            > Database Name: devjobs
            > Collection Name: vacantes
            > Click en 'Create Database'
      - Integrar Trix Editor
        + Ir a la pagina 'https://trix-editor.org/' y descargarlo del su repositorio.

* Deployment de la app
    - Crear e iniciar sesion en Heroku 'https://www.heroku.com/'
    - Agregar a .gitignore los siguientes archivos o directorios
      + node_modules/
      + public/uploads/cv/*
      + public/uploads/perfiles/*
      + variables.env
    - Agrega IP Address en MongoDB Atlas
      > Click SECURITY | "Network Access" -> IP Access List -> click en "ADD IP ADDRESS"
        - Click "ALLOW ACCESS FROM ANYWHERE" -> "Confirmar"
    - Heroku CLI
      + Instalar Heroku CLI en su OS
      + Mostrar la version de heroku
        $ heroku --version
      + Login heroku
       $ heroku login
    - Crear un repositorio en GitHub
      > Respository name: devjobs
      > Descripcion: App de oferta de empleos para devs con NodeJS, MongoDB y Handlebars como Template Engine
      > Public
      Click "Create repository"
    - Deploy a Heroku
      + Crear el reposotorio
        $ heroku create --remote production
      + Crear la variables de entorno
        # $ heroku config:set DATABASE=mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0
        $ heroku config:set DATABASE=mongodb+srv://root:<password>@cluster0.l7xwuum.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0 --remote production
        $ heroky config:set SECRETO=palabrasecreto
        $ heroky config:set KEY=llavesecreta
      + Muestra las branchs
        $ git remote -v
      + Subir al repositorio de heroku (production)
        $ git push production master
      + Copiar la URL "https://cryptic-ridge-85209.heroku.com/" en el browser

* Ideas para Monetizar la App
    - Colocar un Limite de anuncios en el plan gratis.
    - Las vacantes de los usuarios "Premium" se muestran primero.
    - Estadísticas avanzadas (Que habilidades tiene nuestros visitantes).
