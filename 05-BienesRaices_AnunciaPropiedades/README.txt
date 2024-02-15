* Creando la app
    - Iniciar la app
        # npm init
            > package name: (bienenesraices-mvc) ENTER
            > version: (1.0.0) ENTER
            > description: Proyecto MVC con node.js
            > entry point: (index.jjs) ENTER
            > text command: ENTER
            > git repository: ENTER
            > keywords: MVC, Pug, Tailwind, MySQL, Sequelize
            > author: Adriano Ayala
            > license: (ISC) ENTER
            Is this OK? (yes) yes
        # npm init -y
    - Instalar dependencias
      + Express
        # npm install express
        # npm install --save-dev express  (Modo desarrollo)
        # npm install -D express (Modo desarrollo)
      + Nodemon
        # npm install -D nodemon
      + Pug
        # npm install pug
      + TailwindCSS
        # npm install -D tailwindcss autoprefixer postcss postcss-cli
        # npx tailwindcss init
      + Sequelize (ORM)
        # npm install sequelize mysql2
        Crear database:
          > CREATE DATABASE bienenesraices_node_app;
      + Dotenv
        # npm install dotenv
      + Express Validator
        # npm install express-validator
      + BCrypt
        # npm install bcrypt
      + Nodemailer
        # npm install nodemailer
      + CSurf
        # npm install csurf     // Protección CSRF de los formularios (Deprecado!)
      + Cookie Parser
        # npm install cookie-parser
      + JSON Web Token
        # npm install jsonwebtoken
      + Webpack
        # npm install -D webpack webpack-cli
      + Concurrently
        # npm install -D concurrently
      + Dropzone
        # npm install dropzone            # Current version
        # npm install dropzone@5.9.3      # Old version (App)
      + Multer
        # npm install multer
    - Run app
      # npm run start
      # npm start
      # npm run dev

    - Deployment de la App:
      + Exportar la DB de nuestra aplicacion por Workbench o Terminal (nombre_db.sql)
      + Crear e ingresar a la cuenta de GitHub (https://github.com/)
      + Crear e ingresar a la cuenta de Fl0 (https://www.fl0.com/) con la cuenta de GitHub
      + Crear e ingresar a la cuenta de Filess (https://filess.io/)
        > Click en el boton "New Database"
          * Database indentifier: bienenesraices
          * Databse motor: MySQL v8.0.29 y el resto lo dejamos por defecto
          * Click en el boton "Create"
        > Ir a "Databases" -> Seleccionamos nuestra DB -> Muestra la configuracion de la DB
          * Click en boton "Web Client"
            > Click en boton '+' para abrir una 'New Query'
              - Abrir la DB de la app (archivo nombre_db.sql) en un editor y copiar todo el contenido
              - Pegar el contenido SQL a 'New Query'
              - Click en boton 'Execute'
            > Refrescar la pantalla para ver la importacion de la DB y verficar los registros de las tablas
