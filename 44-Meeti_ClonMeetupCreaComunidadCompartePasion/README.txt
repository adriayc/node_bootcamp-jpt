*  Crear la App
  - Iniciar la app
    $ npm init
      > package name: (meeti) ENTER
      > version: (1.0.0) ENTER
      > description: Proyecto Meeti con NodeJS, PostgreSQL y EJS
      > entry point: (index.js) ENTER
      > test command: ENTER
      > git repository: ENTER
      > keywords: ENTER
      > author: Adriano Ayala
      > license: (ISC) ENTER
      Is this OK? (yes) yes
    $ npm start
  - Instalar dependencias
    + Nodemon
      $ npm install --save-dev nodemon
    + Express y DotEnv
      $ npm install --save express dotenv
    + Ejs (Template Engine)
      # npm install --save ejs
    + Ejs Layouts
      $ npm install --save express-ejs-layouts
    + Sequelize (ORM) y PostgreSQL
      $ npm install --save sequelize pg pg-hstore
    + BcryptNodejs (Hash)
      $ npm install --save bcrypt-nodejs    (Deperedado!)
      $ npm install --save bcryptjs
    + Connect Flash (Flash messages), Cookie Parser y Express Session
      $ npm install --save connect-flash cookie-parser express-session
    + Express Validator (Validacion de forms)
      $ npm install --save express-validator             // Current version
      $ npm install --save express-validator@5.3.0       // Old version (Our App)
    + Nodemailer (Envio de emails)
      $ npm install --save nodemailer
    + Passport (Autenticacion)
      $ npm install --save passport passport-local
    + Uuid (Generar IDs únicos)
      # npm install --save uuid
    + Multer (Subir archivos) y Shortid (Generador de IDs cortos)
      # npm install --save multer shortid
    + Webpack
      # npm install webpack webpack-cli --save-dev    // Current version
      # npm install -D babel-loader @babel/core @babel/preset-env webpack webpack-cli       // App version
    + Concurrently (Ejecutar varios comandos simultaneamente)
      # npm install --save concurrently
    + Leaflet Geosearch (Agrega soporte para geocodificación)
      # npm install --save leaflet-geosearch            // Current version
      # npm install --save leaflet-geosearch@2.7.0      // App version
    + Slug
      # npm install --save slug
    + Moment.js
      # npm install --save moment
    + Axios
      # npm install --save axios
    + SweetAlert2 (Alertas)
      # npm install --save sweetalert2

* Instalar PostgreSQL en Linux
  + PostgreSQL 'https://www.postgresql.org/download/'
  + PgAdmin 4 'https://www.pgadmin.org/download/pgadmin-4-apt/'
  + Comandos PSQL:
    Muestra la version de PostgreSQL
      $ psql --version
    Existe 2 formas para ingresar al promt de PostgreSQL.
    - Forma #1:
      $ sudo -i -u postgres
      $ psql
      $ \q
      $ exit
    - Forma #2:
      $ sudo -i -u postgres psql
      $ \q
    Modificar el password de PostgreSQL
      $ sudo -u postgres psql
      $ \password             # Confirmar el password
      $ \q
    Crear una nueva DB en PostgreSQL
      $ \l                          # Listar las DBs
      $ CREATE DATABASE meeti_db;   # Crear una DB
    Backup de la DB
      $ pg_dump -h 127.0.0.1 -p 5432 -U postgres meeti_db > meeti_db.bak

* Solucionar el error de type "geography"
  + Instalar PostGIS 'https://postgis.net/documentation/getting_started/'
  + Abrimos PgAdmin 4 y ejecutamos el siguiente script SQL:
    SQL: CREATE EXTENSION postgis;

* Deployment de la App
  * Crear el repositiorio en GitHub
    + Crear un nuevo repositio
      > Respositorio name: meeti
      > Description: Deployment del proyecto Meeti
      > Public
      > Click 'Create respositorio'
    + Inicilizar el respositorio con git
      $ git init
    + Agregar el archivo .gitignore al repositio
      * node_modules
      * variables.env
      * public/uploads/grupos/*
      * public/uploads/perfiles/*
    + Comandos de git (Subir el repositio a GitHub)
      $ git add .
      $ git commit -m "Deployment de la app a Heroku"
      $ git remote add origin url_reposotorio
      $ git push -u origin master
    + Instalar Heroku CLI 'https://devcenter.heroku.com/articles/heroku-cli'
    + Creando la App en Heroku
      $ heroku create --remote production
      > Ir a la App creada en Heroku    (Crear la App)
        > Click app de heroku -> Click 'More' | 'View Logs' (Muestra los logs)
      $ git push production master    (Subir a Heroku)
    + Importar la Base de Datos en Heroku
      > Ir a la App -> 'Resouces' -> Add-ons (Buscar 'Heroku Postgres') -> Click 'Provision'
      > Ir a la App -> 'Settings' (Muestra las variables de configuracion de la DB Postgres)
        > DATABASE_URL    url_postgres
