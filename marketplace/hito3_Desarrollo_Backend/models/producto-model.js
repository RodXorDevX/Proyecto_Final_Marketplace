const pool = require('../config/db-config');
const format = require('pg-format');

// Función para obtener productos con paginación y ordenamiento
const getProductos = async (limit, page, order_by) => {
    const offset = (page - 1) * limit;
    const order = order_by ? order_by.replace('_', ' ') : 'id ASC';
    const query = format('SELECT * FROM productos ORDER BY %s LIMIT %L OFFSET %L', order, limit, offset);
    const result = await pool.query(query);
    return result.rows;
};

// Función para obtener productos con filtros
const getProductosFiltrados = async (filters) => {
    const { precio_max, precio_min, categoria, vendedor } = filters;
    let query = 'SELECT * FROM productos WHERE 1=1';
    
    if (precio_max) {
        query += format(' AND precio <= %L', precio_max);
    }
    if (precio_min) {
        query += format(' AND precio >= %L', precio_min);
    }
    if (categoria) {
        query += format(' AND categoria_id = %L', categoria);
    }
    if (vendedor) {
        query += format(' AND vendedor_id = %L', vendedor);
    }

    const result = await pool.query(query);
    return result.rows;
};

// Función para crear un nuevo producto
const createProducto = async (productoData) => {
    const { titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id } = productoData;
    const query = format(
        'INSERT INTO productos (titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id) VALUES (%L, %L, %L, %L, %L, %L, %L, %L) RETURNING *',
        titulo, descripcion, precio, categoria_id, size, stock, imagen, vendedor_id
    );
    const result = await pool.query(query);
    return result.rows[0];
};

module.exports = {
    getProductos,
    getProductosFiltrados,
    createProducto
};
