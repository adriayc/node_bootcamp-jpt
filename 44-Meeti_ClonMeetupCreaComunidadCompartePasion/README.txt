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
