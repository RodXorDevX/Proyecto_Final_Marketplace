const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Ruta POST /carrito para agregar productos al carrito
router.post('/', carritoController.addProductoToCarrito);

module.exports = router;
