const pool = require('../config/db-config');
const format = require('pg-format');

// Obtener todos los usuarios
const getUsuarios = async () => {
    const result = await pool.query('SELECT id, email, nombre, direccion FROM usuarios');
    return result.rows;
};

// Registrar un nuevo usuario
const registerUsuario = async (userData) => {
    const { email, password, nombre, direccion } = userData;
    const query = format(
        'INSERT INTO usuarios (email, password, nombre, direccion) VALUES (%L, %L, %L, %L) RETURNING id, email, nombre',
        email, password, nombre, direccion
    );
    const result = await pool.query(query);
    return result.rows[0];
};

// Autenticar un usuario
const loginUsuario = async (email, password) => {
    const result = await pool.query('SELECT id, email, nombre FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
    return result.rows[0];
};

// Verificar si un usuario existe
const getUsuarioById = async (id) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getUsuarios,
    registerUsuario,
    loginUsuario,
    getUsuarioById
};
