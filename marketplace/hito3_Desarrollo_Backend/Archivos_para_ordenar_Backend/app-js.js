// Importación de dependencias
const express = require('express');
const cors = require('cors');

// Importación de middleware
const logRequest = require('./middlewares/logger');

// Importación de rutas
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const carritosRoutes = require('./routes/carritos');
const categoriasRoutes = require('./routes/categorias');
const tipoUsuarioRoutes = require('./routes/tipoUsuario');

// Configuración inicial de Express
const app = express();
const PORT = 3000;

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
