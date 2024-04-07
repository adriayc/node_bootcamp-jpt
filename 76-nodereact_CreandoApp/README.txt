* Crear la app
  - Instalar Crete Reat App
    $ npm install -g create-react-app
  - Iniciar la app
    $ create-react-app cliente-api
    $ npx create-react-app cliente-api        // Si no instalaste 'create-react-app'
    $ cd client-api
    $ npm start                               // Ejecutar la App
    Abre la siguiente URL en el browser: 'http://localhost:3000/'
  - Installar dependencias
    + Rect Router Dom (Rutas)
      $ npm install --save react-router-dom
    + Axios (HTTP requests)
      $ npm install --save axios
    + SweetAlert2 (Alertas)
      $ npm install --save sweetalert2

* Generar el build de production
  $ npm run build

* Deploy de la App a Netlify 'https://www.netlify.com/'
  - Crear e inicar sesion
  - Click 'Sites' (Arrastrar el build de generado para su respectivo creacion del sitio)
  - Click en la URL generado por Netlify y copiar para agregar al whitelist del CORS (Backend) o los vars de Heroku
