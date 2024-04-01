* Creando la App REST API's
  - Iniciar la APP
    $ npm init
      > package name: (restapis) restapisnode
      > version: (1.0.0) ENTER
      > descripcion: Aprendiendo a crear REST APIs
      > entry point: (index.js) ENTER
      > test command: ENTER
      > git repository: ENTER
      > keywords: ENTER
      > author: Adriano Ayala
      > license: (ISC) ENTER
      Is this OK? (yes) y
    $ npm start
  - Instalar dependencias
    + Express
      $ npm install --save express
    + Nodemon
      $ npm install --save-dev nodemon

* MongoDB Community Edition en Ubuntu
  - Instalar MongoDB Community Edition 'https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/'
    + Comandos MongoDB:
      $ mongod --version        // Muestra la version
      $ mongosh                 // Acceder a MongoDB
        > $ show dbs            // Listar las DBs
        > $ use name_db         // Crear una DB
        > $ db                  // Muesta la DB donde esta actualmente
        > $ exit                // Para salir
  - Instalar MongoDB Compass (GUI) 'https://www.mongodb.com/try/download/compass'
