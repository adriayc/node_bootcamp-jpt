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
    + Shortid (Generador de IDs) y Multer (Subir archivos)
      $ npm install --save shortid multer
    + CORS (Intercambio de recursos de origen cruzado)
      $ npm install --save cors
    + JSON Web Token
      $ npm install --save jsonwebtoken
    + BCrypt (Hashedo PW)
      $ npm install --save bcrypt
    + Dotenv (Variables de entorno)
      $ npm install --save dotenv

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

* Exportar la Base de Datos (Local)
  - Abrir la terminal, crear un directorio de bkps y ejecutar los siguientes comandos (Para cada documento de la DB):
    $ mongoexport -d restapis_db -c clientes -o clientes.json
    $ mongoexport -d restapis_db -c pedidos -o pedidos.json

* Importar la Base de Datos (Mongo Atlas)
  - Crear e inicia sesion 'https://www.mongodb.com/atlas/database'
    > Click 'Database' -> Click 'Build Database' (Crear nuevo cluster)
      * M0 (Free)
      * Y todo por defecto
      * Click 'Create Deployment'
    > Security | Click 'Database Access' -> EDIT (user: root) (Editar el password del usuario root)
      * Password Authentication: root123
      * Click 'Update User'
    > Click 'Database' -> click 'Connect' -> click 'Drivers' -> Copiar 'Connection string' (String de conexion a mongodb)
      > mongodb+srv://<user>:<password>@<dominio>/<db_name>?retryWrites=true&w=majority&appName=Cluster0
    > Crear una nueva base de datos desde MongoDB Atlas o MongoDB Compass
    > Click 'Database' -> click '...' (Cluster0) | 'Command Line Tools' -> 'Data Import and Export Tools' | Copiar: 'mongoImport'
      + Abrir la terminal y ejecutar el siguiente comando:
        EX: mongoimport --uri mongodb+srv://root:<PASSWORD>@cluster0.h7hq0lp.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
        $ mongoimport --uri mongodb+srv://<user>:<password>@cluster0.h7hq0lp.mongodb.net/name_db --collection clientes --type json --file clientes.json
