# React + TypeScript + Vite

# Proyecto-Tramo-3

El proyecto es un Foro donde cualquier persona puede ver los post y comentarios que realizan las distintas personas que usan la aplicación.
Si te das de alta a la aplicación, podras loguearte, crear nuevos "Post" y agregar comentarios a los ya creados.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Instalación

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto.git
   cd proyecto-tramo.3
   ```

Instalar Dependencias del Servidor:

npm install

Instalar Dependencias del Cliente:

npm install

Instalar Dependencias Globales (si es necesario):

npm install -g nodemon

Configuración
Crea un archivo .env en la raíz del proyecto para configurar variables de entorno. Asegúrate de proporcionar los valores adecuados para tu entorno de desarrollo.

DB_CONNECTION_STRING=tu_cadena_de_conexion_a_mongo
PORT=3000

Backend
Abre una terminal y ejecuta el servidor:

npx nodemon app

Frontend
Abre otra terminal y ejecuta la aplicación del cliente:

npm run dev

La aplicación estará disponible en http://localhost:5173.

Dependencias
Lista de las dependencias principales utilizadas en el proyecto:

Express
MongoDB
React
Helmet
CORS
dotenv
