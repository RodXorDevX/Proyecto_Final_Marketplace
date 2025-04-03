const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto-controller');

// Ruta GET /productos con paginación y ordenamiento
router.get('/', productoController.getProductos);

// Ruta GET /productos/filtros con múltiples parámetros de filtrado
router.get('/filtros', productoController.getProductosFiltrados);

// Ruta POST /productos para crear nuevos productos
router.post('/', productoController.createProducto);

//Ruta para obtener productos por ID
router.get('/:id', productoController.getProductoPorId);

module.exports = router;
