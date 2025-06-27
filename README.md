# Marvel Universe API

Esta es una API backend construida con **Node.js** que genera una API RESTful a partir de un archivo **Excel** con información sobre el universo Cinematográfico de Marvel, como personajes, películas. Utiliza los datos contenidos en el archivo Excel para proporcionar endpoints que permitan consultar información relevante del universo Marvel.

## Tecnologías usadas

- **Node.js**: El entorno de ejecución de JavaScript.
- **Express**: Framework para crear la API REST.
- **xlsx**: Paquete de Node.js para leer y convertir archivos Excel.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Para manejar variables de entorno (si es necesario).

## Instalación

1. **Clona el repositorio**:

   git clone https://github.com/tu-usuario/marvel-universe-api.git
   cd marvel-universe-api

2. **Instala las dependencias**:
    npm install

3. **Configura tu archivo .env (si es necesario)**:
    Crea un archivo .env en la raíz del proyecto y agrega las variables de entorno que puedas necesitar (por ejemplo, configuración de la base de datos, puerto, etc.).
        PORT=3000

4. **Prepara el archivo Excel**:
    Debes tener un archivo MarvelData.xlsx que contenga la información del universo Marvel. Este archivo debe estar en la raíz del proyecto o en la carpeta indicada en el código.

## Uso

1. **Inicia el servidor**:
    npm run dev

2. **Accede a la API:**:
    Una vez que el servidor esté corriendo, puedes realizar peticiones a los siguientes endpoints:
    GET /characters - Obtiene una lista de todos los personajes.
    GET /characters/:id - Obtiene los detalles de un personaje específico por ID.
    GET /movies - Obtiene una lista de todas las películas.
    GET /comics - Obtiene una lista de todos los cómics.
    Por ejemplo, si tu servidor está corriendo en http://localhost:3000, puedes hacer una solicitud a:
    curl http://localhost:3000/characters


**Ejemplo de uso de la API**:
    Obtener todos los personajes
    curl http://localhost:3000/characters
    Obtener un personaje específico
    curl http://localhost:3000/characters/1
    Obtener todas las películas
    curl http://localhost:3000/movies

## Estructura del proyecto
marvel-universe-api/
│
├── data/                  # Carpeta donde se encuentra el archivo Excel (MarvelData.xlsx)
├── src/                   # Código fuente de la aplicación
│   ├── controllers/       # Lógica para manejar las peticiones HTTP
│   ├── models/            # Modelos de datos para los personajes, películas, etc.
│   ├── routes/            # Definición de rutas de la API
│   └── app.js             # Configuración de la aplicación y rutas
├── .env                   # Archivo de configuración de variables de entorno
├── package.json           # Archivo de configuración de npm
└── README.md              # Este archivo

## Licencia
Este proyecto está bajo la licencia MIT.

## Contacto
Si tienes preguntas, no dudes en contactarme: