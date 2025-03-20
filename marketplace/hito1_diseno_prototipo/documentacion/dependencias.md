# Listado de Dependencias del Proyecto Marketplace

## Frontend

El frontend de este proyecto está construido con React. A continuación, se listan las dependencias principales que se necesitan instalar:

### React y Herramientas Relacionadas

- `react`: Biblioteca de JavaScript para construir interfaces de usuario.
- `react-dom`: Paquete que permite a React interactuar con el DOM.
- `react-scripts`: Conjunto de scripts y configuraciones utilizadas por Create React App.

### Navegación

- `react-router-dom`: Biblioteca para manejar rutas en aplicaciones web construidas con React.

### Estilos

- `styled-components`: Permite escribir código CSS en JavaScript para estilizar componentes de React.

### Herramientas de Desarrollo

- `eslint`: Herramienta de linting para JavaScript y JSX.
- `prettier`: Formateador de código para mantener un estilo consistente.

Para instalar todas estas dependencias, puedes ejecutar el siguiente comando en tu terminal:
npm install react react-dom react-scripts react-router-dom styled-components eslint prettier


## Backend

El backend de este proyecto está construido con Express.js. A continuación, se listan las dependencias principales que se necesitan instalar:

### Express y Middleware

- `express`: Framework de Node.js para aplicaciones web y API.
- `cors`: Middleware para habilitar CORS (Compartir Recursos de Origen Cruzado).
- `body-parser`: Middleware para analizar el cuerpo de las solicitudes entrantes en un middleware antes de tus manejadores.

### Autenticación y Seguridad

- `jsonwebtoken`: Implementación de JSON Web Tokens para Node.js.
- `bcryptjs`: Biblioteca para hash de contraseñas.

### Base de Datos

- `pg`: Cliente de PostgreSQL para Node.js.
- `sequelize`: ORM de Node.js basado en promesas para Postgres, MySQL, MariaDB, SQLite y Microsoft SQL Server.

### Herramientas de Desarrollo

- `nodemon`: Herramienta que ayuda a desarrollar aplicaciones basadas en node.js al reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos.
- `dotenv`: Módulo que carga variables de entorno desde un archivo `.env`.

Para instalar todas estas dependencias, puedes ejecutar el siguiente comando en tu terminal:
npm install express cors body-parser jsonwebtoken bcryptjs pg sequelize nodemon dotenv


## Comandos Útiles

Para iniciar el servidor de desarrollo del frontend, puedes usar:

npm start


Para iniciar el servidor de desarrollo del backend con nodemon, puedes usar:

nodemon app.js