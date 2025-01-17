# Descripción
Este repositorio contiene el material práctico desarrollado durante la cursada de la materia Construcción de Interfaces de Usuario en la Universidad Nacional de Quilmes.
Se trata de un conjunto de tres trabajos prácticos que se realizaron en equipos de 4~5 personas, en el que se tuvo que implementar:

+ Una API
+ Una página Web
+ Una aplicación nativa (Mobile)

Las tres trabajos prácticos eran trabajados sobre el mismo proyecto: una página simulando a Mercado Libre.

Este repositorio contiene ese trabajo realizado entre mi grupo y yo.

# Enunciado del proyecto y modelo del mismo

+ https://github.com/unq-ui/material/tree/master/TPs/2024s2
+ https://github.com/unq-ui/mercadolibre-model

# Tecnologías usadas
+ `Kotlin`<br> como lenguaje de programación para la API.
+ `Javalin`<br> como framework para la construcción de la API.
+ `React` y `React Router`<br> como frameworks para la página web.
+ `HTML`, `CSS` y `JavaScript`<br> para diseñar la página web y su comportamiento.
+ `React Native`<br> para el desarrollo de la aplicación nativa.
+ `Axios`<br> para realizar solicitudes HTTP desde el frontend hacia la API construida con Javalin.
+ `Expo Go`<br> para construir y probar la aplicación.
+ `GitHub`<br> para el control de versiones y trabajo en equipo.

### Otras herramientas usadas
+ **IntelliJ IDEA**<br> como IDE principal para el proyecto.
+ **Android Studio**<br> para probar la aplicación nativa desde Expo Go en el emulador de Android.
+ **Postman**<br> para realizar peticiones HTTP a la API y así probar su correcto funcionamiento.

# Contenidos abordados
Durante la cursada, se exploraron y enseñaron los siguientes contenidos:

+ Aplicación centralizada, cliente-servidor, distribuida, RIA y arquitecturas web.
+ Interfaces orientadas a eventos, pedido-respuesta y client-initiative vs application-initiative.
+ HTML, CSS, server pages, templates, y descripciones basadas en componentes.
+ Validaciones, manejo de errores, transacciones y patrones como MVC.
+ REST, navegación, manejo del estado conversacional, y comunicación sincrónica y asincrónica.
+ Concepto, pertinencia y estándares.

### Conceptos implementados
+ **Controllers**: Para manejar las rutas y la lógica de negocio de la API.
+ **DTOs**: Para transferir datos entre las capas de la aplicación.
+ **DAOs**: Para encapsular la lógica de acceso a la base de datos.
+ **Roles**: Para gestionar permisos y accesos en la aplicación.
+ **Tokens**: Implementados con `JWTGenerator` para la autenticación y autorización segura.

### Conceptos de React implementados
+ **Componentes**: Para estructurar y reutilizar bloques funcionales en la interfaz de usuario.
+ **Contextos**: Para compartir datos y estado global sin necesidad de prop drilling.
+ **Estados**: Para manejar información dinámica en la aplicación.
+ **Hooks**: Para gestionar lógica y ciclos de vida de los componentes de forma funcional.

# ¿Cómo instalar los proyectos?
**Nota**: Debes asegurarte de tener instalado [Node.js](https://nodejs.org/en)

1. Clonar el repositorio
```
git clone https://github.com/mjgalarza1/Mercado-Libre---Construccion-de-UI.git
```
2. Para instalar, abrir una terminal, ubicarse en la carpeta raíz del proyecto, y ejecutar el siguiente comando
```
npm install
```
3. Por último, ejecutar el mismo comando `npm install` dentro de la carpeta `Web`, y luego dentro de la carpeta `Mobile`

# ¿Cómo ejecutar las aplicaciones?
### API
Para ejecutar la API, ejecutar el `main.kt` que se encuentra dentro de `Api/src/main/kotlin/unq.mercadolibre.api`.<br>
La API se levantará de manera local en http://localhost:7070
### WEB
1. Levantar la API para que la página web funcione adecuadamente.
2. Para levantar la aplicación web, abrir una terminal, ubicarse en la carpeta `Web`, y ejecutar el siguiente comando
```
npm run dev
```
La aplicación web se levantará de manera local en http://localhost:5173
### MOBILE
1. Levantar la API para que la página web funcione adecuadamente.
2. Para levantar la aplicación nativa, abrir una terminal, ubicarse en la carpeta `Mobile`, y ejecutar el siguiente comando
```
npm run dev
```
La aplicación nativa se levantará de manera local en http://localhost:8081

# ⚠ Importante
+ ¿Por qué no hay commits? <br> El repositorio original **es privado**, y no tengo el control para hacerlo público _(ni haciendo un fork podía hacerlo público)_, por lo no me quedó otra alternativa que crear uno nuevo.
+ Este repositorio está bajo licencia de uso académico, destinado a fines educativos y como muestra de los contenidos vistos en la materia.

