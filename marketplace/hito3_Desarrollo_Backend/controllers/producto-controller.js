// --- START OF FILE producto-controller.js ---

const productoModel = require('../models/producto-model');
const { getProductosHATEOAS } = require('../utils/hateoas-util');

// Obtener productos con paginación, ordenamiento y filtrado opcional por vendedor
const getProductos = async (req, res) => {
    try {
        // Destructure potential filters including vendedor_id
        const { limit = 10, page = 1, order_by, vendedor_id } = req.query;

        // Validate pagination parameters
        if (isNaN(limit) || isNaN(page) || page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
        }
        // Validate vendedor_id if provided (optional, depends on requirements)
        if (vendedor_id && isNaN(parseInt(vendedor_id))) {
             return res.status(400).json({ error: 'Parámetro vendedor_id inválido' });
        }

        // Pass vendedor_id to the model function
        const productos = await productoModel.getProductos(
            parseInt(limit),
            parseInt(page),
            order_by,
            vendedor_id ? parseInt(vendedor_id) : undefined // Pass parsed ID or undefined
        );

        // Apply HATEOAS formatting
        res.json(getProductosHATEOAS(productos));
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener productos con filtros (Kept as is, uses a different endpoint /productos/filtros)
const getProductosFiltrados = async (req, res) => {
    try {
        // This uses 'vendedor' query param based on original code. Adjust if needed.
        const { precio_max, precio_min, categoria, vendedor } = req.query;
        const productos = await productoModel.getProductosFiltrados({
            precio_max,
            precio_min,
            categoria,
            // Pass vendedor param as vendedor_id to the model function if needed
            vendedor_id: vendedor ? parseInt(vendedor) : undefined
        });
        res.json(productos); // Note: HATEOAS not applied here in original code
    } catch (error) {
        console.error('Error aplicando los filtros:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo producto (Kept as is)
const createProducto = async (req, res) => {
    try {
      console.log("🟨 Datos recibidos en el backend:", req.body);
      const productoData = req.body;
      // Ensure vendedor_id is included in productoData from the frontend when creating
      if (!productoData.vendedor_id) {
          // Potentially get it from authenticated user session/token if not sent by client
          return res.status(400).json({ error: "Falta el ID del vendedor (vendedor_id)." });
      }
      const nuevoProducto = await productoModel.createProducto(productoData);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("🔥 Error creando el producto:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

module.exports = {
    getProductos,
    getProductosFiltrados,
    createProducto
};
// --- END OF FILE producto-controller.js ---