# NODE.JS - BOOTCAMP DESARROLLO WEB INC. MVC Y REST APIS
> Juan Pablo De la torre Valdez

## ¿Que es Node.js?
- Entorno de Ejecución de JavaScript orientado a Eventos Asíncronos.
- Utilizar un Enfoque de Eventos Asíncronos; lo que significa que puede realizar múltiples tareas asicrónas tales como leer y escribir  en el servidor, conectarse a una base ded atos o enviar Request de Formulario.

### Ventajas de Node.js
- Código de JavaScript (ES6+).
- NPM con una gran cantidad de paquetes.
- Apps Monolíticas, Micro Servicios o API's.

## ¿Que es Express?
- Es un Framework para Node.js, muy minimalista y con una serie de opciones que son comunes para crear sitios web y aplicaciones móviles.
- Su Principal ventaja es que puedes intalar los paquetes  que vas necesitando en tu aplicacion y no tiene un gran cantidad de herramientas ya incluidas.

### ¿Qué incluye Express?
- Routing y Redireccionamiento.
- Middleware.
- Manejo de Errores.
- Soporte a los diferentes Métodos HTTP.
- Soporte de Template Engines.

## ¿Quien  utiliza Node.js?
Apps que utilizan Node.js:
- Netflix
- Uber
- Groupon
- PayPal
- Linkedin
- Walmart
- Medium
- Nasa

## Instalar Node.js en Windows
- Ir la pagina de [Node.js](https://nodejs.org/en/)
- Descargar la version LTS
- Instalar la app de Node.js

## ¿Qué es el Routing?
- El Routing es por donde van a transitar los usuarios de nuestro sitio web o aplicación.
- Con diferentes Rutas, nuestros usuarios podrán navegar a lo largo de diferentes secciones del sitio web  o llenar diferentes formularios.

### Métodos HTTP
- GET - Utilizado para mostrar información.
- POST - Utilizado para enviar información.
- PUT / PATCH - Utilizado para actualizar información.
- DELETE - Utilizado para eliminar información.

## ¿Qué es un Template Engine?
- Template Engine o Motor de Plantilla son tecnologías que nos permiten crear el código HTML y mostrar información contenida en variables de una forma más compacta y clara.
- Pug, Handlebars, EJS son las opciones más populares para Node.js.
- También es posible utilizar React, Angular, Svelte o Vue como tu Template Engine; pero necesitarás crear un API con respuesta JSON.

### Ventajas de un Template Engine
- La forma en que se crea el Código HTML tiende a ser más simple.
- Puedes utilizar e imprimir información del servidor o base de datos de forma más sencilla.
- La seguridad es más sencilla de implemetar ya que la información es renderizada por el mismo servidor.

### Desventajas de un Template Engine
- Cuando mostramos información con un Template Engine, esta información y sus interacciones no son muy dinámicas a comparacion de React o Vue.
- Consumen más recursos ya que el código HTML es creado por el servidor a diferencia de Vue o React donde es creado por el cliente (navegador).

## ¿Qué es MVC?
- MVC son las iniciales de Model View Controller.
- Es un patrón de arquitectura de software que permite la separación de obligaciones de cada pieza de tu código.

### Ventajas de MVC
- MVC no mejora el performace del código, tampoco da seguridad; pero tu código tendrá un mejor orden y será fácil de mantener.
- En un grupo de trabajo, el tener el código ordenado permite que más de una persona pueda entender que es lo que hace cada parte de él.
- Aprender MVC, hará que otras tecnologías como Laravel, Nest, Rails, Django, Net Core, Spring Boot te sean más sencillas de aprender.

### Partes de MVC
- M = Model o Modelo
- V = View o vista
- C = Contoller o Controlador

### Modelo en MVC
- Encargado de todas las interacciones en la base de datos, obtener datos, actualizarlos y eliminar.
- El Modelo se encarga de consultar una base de datos, obtener la información pero no la muestra, eso es trabajo de la vista.
- El Modelo tampoco se encarga de actualizar la información directamente; es el Controlador quien decide cuándo llamarlo.

### Vista en MVC
- Se encarga de todo lo que se ve en pantalla (HTML).
- Node soporta múltiples Template Engine como son EJS, Pug, Handlebars.
- Si utilizas React, Vue, Angular, Svelte, estos serían tu vista.
- El Modelo consulta la base de datos, pero es por medio del Controlador que se decide que Vista hay que llamar y que datos presentar.

### Controlador en MVC
- Es el que comunica modelo y vista; antes de que el Modelo consulte la base de datos el Controlador es el encargado de llamar un Modelo en especifico.
- Una vez consultado el Modelo, el controlador recibe esa información, manda llamar a la vista y le pasa la información.
- El controlador es el que manda llamar la vista y modelos, que se requieren en cada parte de tu aplicación.

### Router en MVC
- Es el encargado de registrar todas las URL's o Endpoints que va a soportar nuestra aplicación.
- Ejemplo: Si el Usuario accede a /clientes el router ya tiene registrada esa ruta y un controlador con una función que sabe que Modelo debe llamar y que vista mostrar cuando el usuario visita esa URL.
