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

## ¿Qué es ORM?
- ORM son las iniciales de Object Relational Mapping.
- Es una técnica que se utiliza donde los datos de una base de datos son tratados como Objetos, utilizando un paradigma de Programación Orientado a Objectos.
- Node.js tiene una gran cantidad de ORM's que se instalan como librería.
- En MVC, un ORM se relaciona bastante con el Modelo.

### Ventajas de un ORM
- Comenzar a crear aplicaciones que utilicen bases de datos, sin necesidad de escribir código SQL y tampoco saber sobre modelado de bases de datos.
- Velocidad en desarrollo ya que tiene un gran cantidad de métodos para crear, listar, actualizar o eliminar datos.
- La mayoría cuentan con todas las medidas de seguridad.

### Ejemplos de ORM
- Prisma
- Sequealize
- Bookshelf.js
- Mongoose
- TypeORM

## ¿Que son Las Asociaciones?
- Las Asociaciones son formas de cruzar información en tu base de datos.
- Sequelize soporta todos los tipos de relaciones en una base de datos: 1:1, 1:N y N:N.
- La forma en que lo hace es pro medio de métodos que ya existen en Sequelize.

### Métodos para crear asociaciones
- hasOne
- belongsTo
- hasMany
- belongsToMany

#### hasOne
- Es para crear Relaciones 1:1, donde un registro puede tener hasta 1 registro relacionado en otra tabla.
- Ejemplo: Una Propiedad tiene un Vendedor, un Usuario tien un Perfil, un Producto tiene una Categoría.
- Sintaxis: ```Vendedor.hasOne(Propiedad)```
- En este ejemplo; Propiedad deberá tener una llave foránea que haga referencia a un Vendedor, si no se especifica, Sequelize lo va a crear.

### belongsTo
-  Al igual que hasOne es para Relaciones 1:1, donde un registro puede tener hasta 1 registro relacionado en otra tabla, la única diferencia es sintaxis.
- Sintaxis: ```Propiedad.belongsTo(Vendedor)```
- En este ejemplo; Pripiedad deberá tener una llave foránea que haga referencia a un Vendedor, si no se especifica, Sequelize lo va crear.

#### hasMany
- Es para crear Relaciones 1:N, donde un registro puede tener múltiples coincidencias o relaciones en otra tabla.
- Ejemplo: Un Vendedor tiene múltiples Propiedades, un Usuario tiene múltiples Posts, un Producto tiene múltiples Reviews.
- Sintaxis: ```Vendedor.hasMany(Propiedad)```
- En este ejemplo; Propiedad deberá tener una llave foránea que haga referencia a un Vendedor.

#### belongsToMany
- Es utilizado para las relaciones N:N, en este tipo de relaciones se utiliza una tabla pivote, por lo tanto se realiza mediante 3 modelos.
- Sintaxis: ```Estudiante.belongsToMany(Clase, { through: HorarioClase })```
- En este ejemplo; Múltiples Estudiantes tendrán Múltiples Clases, por lo tanto se crear un 3er Tabla que sirve como pivote con referencias por llave foránea tanto a Estudiantes como Clases.

## ¿Que es REST API, API's y Web Services?
### ¿Que es un Web Services?
- Permite intecambiar datos entre aplicaciones vía web utilizando HTTP.
- En su forma más simple se dice que cuando una computadora se conecta a otra para obtener información es un Web Services.
- Existe una gran cantidad de estándares: XML, SOAP, REST y GRAPHQL.

### ¿Que es una API?
- API (Aplication Programming Interface - Interfaz de Programación de Aplicaciones)
- Funciones o métodos que ofrece una librería para ser utilizada por otro software y acceder a sus recursos.
- No siempre es via web, puede ser que se accedan a los recursos por medio de un archivo.
- Para acceder al servicio hay que enviar una petición estructurada.
- Ejemplo: Google Maps API

NOTA: Todos los Web Services son API's pero no todas las API's son web services.

DIFERENCIA:La diferencia es que la API no require siempre tener conexión a una red mientras que el Web Service si.

### REST
- REST (Repressentational State Transfer)
- Es un patrón para hacer API's.
- Define cómo se accede a los recursos de una API existente.
- Puede ser diseñadas en cualquier lenguaje.
- Pueden ser consumidas en cualquier lenguaje (Móvil o Web).
- Responden a los request de HTTP: GET, POST, PUT, PATCH y DELETE.

NOTA: Cada API es diferente

### Verbos HTTP, Request o Métodos de Petición
- GET: Obtener datos del servidor.
- POST: Enviar datos al servidor (Crear nuevos).
- PUT: Actulizar un registro.
- DELETE: Eliminar datos del servidor.
- PATCH: Actualizar parcialmente un registro.

### REST API's y Request
Cada REST API contrará con endpoints (URL's) para realizar las operaciones CRUD y REST propone los siguientes:
- GET         /clientes         Obtener todos los clientes
- GET         /clientes/10      Obtener el cliente con el ID 10
- POST        /clientes         Añade un nuevo cliente
- PUT         /clientes/10      Actualiza el cliente con el ID 10
- DELETE      /clientes/10      Eliminar el cliente con el ID 10
