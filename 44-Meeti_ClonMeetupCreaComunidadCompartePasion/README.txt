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
