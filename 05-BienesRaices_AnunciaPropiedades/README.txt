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
    - Run app
      # npm run start
      # npm start
      # npm run dev
