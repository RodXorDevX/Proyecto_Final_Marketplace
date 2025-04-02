const productoModel = require('../models/producto-model');
const { getProductosHATEOAS } = require('../utils/hateoas-util');

// Obtener productos con paginación y ordenamiento
const getProductos = async (req, res) => {
    try {
        const { limit = 10, page = 1, order_by } = req.query;
        if (isNaN(limit) || isNaN(page) || page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
        }
        const productos = await productoModel.getProductos(parseInt(limit), parseInt(page), order_by);
        res.json(getProductosHATEOAS(productos));
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener productos con filtros
const getProductosFiltrados = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, vendedor } = req.query;
        const productos = await productoModel.getProductosFiltrados({ 
            precio_max, 
            precio_min, 
            categoria, 
            vendedor 
        });
        res.json(productos);
    } catch (error) {
        console.error('Error aplicando los filtros:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    try {
      console.log("🟨 Datos recibidos en el backend:", req.body); // 👈 agrega esto
  
      const productoData = req.body;
      const nuevoProducto = await productoModel.createProducto(productoData);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("🔥 Error creando el producto:", error); // 👈 imprime el error
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

module.exports = {
    getProductos,
    getProductosFiltrados,
    createProducto
};
