const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido-controller');

// Ruta GET para obtener los pedidos de un usuario
router.get('/', pedidoController.getPedidos);

// Ruta POST para crear un pedido
router.post('/crear', pedidoController.createPedido);

module.exports = router;
