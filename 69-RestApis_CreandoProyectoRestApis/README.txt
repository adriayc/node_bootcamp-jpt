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
    + Mongoose (ORM de mongo)
      $ npm install --save mongoose

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
  - Crear una nueva Base de Datos con MongoDB Compass
    > New Connection
      > URI: mongodb://localhost:27017
      > Click 'Connect'
    > Click 'Databases' -> 'Databases' -> 'Create database'
      > Databases Name: restapis_db
      > Collection Name: clientes
      > Click 'Create Database'

* Postman
  - Instalar Postman 'https://www.postman.com/downloads/'
  - Crear un nuevo Workspace
    > Abrir Postman -> Dashboard | Workspaces -> Create Workspace
      > Name: RestApisNode
      > Summary: REST API's with NodeJS and MongoDB
      > Visibility: Team
      > Click 'Create Workspace'
  - Crear una colección para las solicitudes
    > Click 'Create collection' | Editar el nombre 'New Collection'
    > Agregar nuevas solicitude 'Add a request'
      > GET   localhost:5000              Click 'Send'
        > Body -> Pretty
          Inicio
