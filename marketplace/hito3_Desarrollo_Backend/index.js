// Importación de dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');


// Importación de middleware
const logRequest = require('./middlewares/logger-middleware');

// Importación de rutas
const productosRoutes = require('./routes/producto-routes');
const usuariosRoutes = require('./routes/usuario-routes');
const carritosRoutes = require('./routes/carrito-routes');
const categoriasRoutes = require('./routes/categoria-routes');
const tipoUsuarioRoutes = require('./routes/tipo-usuario-routes');

// Configuración inicial de Express
const app = express();
const PORT = 3000;

//JWS
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    console.error("ERROR: La variable de entorno JWT_SECRET no está definida.");
    process.exit(1); // Detiene la ejecución si no hay clave JWT
}

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite el manejo de JSON en las solicitudes
app.use(logRequest); // Middleware para loguear las solicitudes

// Rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/carrito', carritosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/tipo-usuario', tipoUsuarioRoutes);

// Inicio del servidor
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app; // Exportar para tests
