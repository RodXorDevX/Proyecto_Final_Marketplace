// --- START OF FILE producto-model.js ---

const pool = require('../config/db-config');
const format = require('pg-format');

// Función para obtener productos con paginación, ordenamiento y filtro opcional por vendedor_id
const getProductos = async (limit, page, order_by, vendedor_id) => { // Add vendedor_id parameter
    const offset = (page - 1) * limit;
    // Default order or use provided order_by
    const order = order_by ? order_by.replace('_', ' ') : 'id ASC';

    let queryParams = []; // Array to hold query parameters for pg-format
    let query = 'SELECT * FROM productos';

    // Dynamically add WHERE clause if vendedor_id is provided
    if (vendedor_id !== undefined && vendedor_id !== null) {
        query += ' WHERE vendedor_id = %L'; // Use %L for literal values like numbers
        queryParams.push(vendedor_id);       // Add vendedor_id to parameters array
    } else {
        // If no specific filter, add a dummy WHERE clause if needed before ORDER BY/LIMIT
        // Or simply proceed if your base query doesn't need a WHERE
         query += ' WHERE 1=1'; // Placeholder if you might add other filters later
    }

    // Add ORDER BY, LIMIT, OFFSET
    // Use %s for identifiers like column names or ASC/DESC
    // Use %L for literal values like limit and offset numbers
    query += format(' ORDER BY %s LIMIT %L OFFSET %L', order, limit, offset);

    // Format the final query with parameters
    const finalQuery = format(query, ...queryParams); // Spread parameters into format

    console.log("Executing SQL:", finalQuery); // Log the generated query for debugging

    const result = await pool.query(finalQuery);
    return result.rows;
};

// Función para obtener productos con filtros (Updated to use vendedor_id consistently)
const getProductosFiltrados = async (filters) => {
    // Use vendedor_id consistently
    const { precio_max, precio_min, categoria, vendedor_id } = filters;
    let query = 'SELECT * FROM productos WHERE 1=1'; // Start with a base TRUE condition
    const queryParams = [];

    if (precio_max) {
        query += ' AND precio <= %L';
        queryParams.push(precio_max);
    }
    if (precio_min) {
        query += ' AND precio >= %L';
        queryParams.push(precio_min);
    }
    if (categoria) {
        query += ' AND categoria_id = %L';
        queryParams.push(categoria);
    }
    if (vendedor_id) { // Check for vendedor_id
        query += ' AND vendedor_id = %L'; // Filter by vendedor_id
        queryParams.push(vendedor_id);
    }

    const finalQuery = format(query, ...queryParams);
    console.log("Executing SQL (filtros):", finalQuery);

    const result = await pool.query(finalQuery);
    return result.rows;
};

// Función para crear un nuevo producto (Kept as is, already uses vendedor_id)
const createProducto = async (productoData) => {
    const { titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id } = productoData;
    // Ensure all required fields are present, especially vendedor_id
    if (!vendedor_id) throw new Error("vendedor_id es requerido para crear un producto");

    const query = format(
        'INSERT INTO productos (titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id) VALUES (%L, %L, %L, %L, %L, %L, %L, %L) RETURNING *',
        titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id
    );
    console.log("Executing SQL (create):", query);
    const result = await pool.query(query);
    return result.rows[0];
};

const getProductoPorId = async (id) => {
    const query = format('SELECT * FROM productos WHERE id = %L', id);
    const result = await pool.query(query);
    return result.rows[0]; // Puede ser undefined si no existe
  };

module.exports = {
    getProductos,
    getProductosFiltrados,
    createProducto,
    getProductoPorId
};
// --- END OF FILE producto-model.js ---