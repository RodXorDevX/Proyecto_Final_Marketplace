const pool = require('../config/db-config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
const getUsuarios = async () => {
    const result = await pool.query('SELECT id, email, nombre, direccion FROM usuarios');
    return result.rows;
};

// Registrar un nuevo usuario con contraseña encriptada
const registerUsuario = async (userData) => {
    const { email, password, nombre, direccion } = userData;

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario en la base de datos
    const query = 'INSERT INTO usuarios (email, password, nombre, direccion) VALUES ($1, $2, $3, $4) RETURNING id, email, nombre';
    const values = [email, hashedPassword, nombre, direccion];
    const result = await pool.query(query, values);

    return result.rows[0];
};

// Autenticar usuario y generar JWT
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.loginUsuario(email, password);
        
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Devolver el token y los datos del usuario
        return res.json({
            token: usuario.token,  // El token generado
            usuario: usuario.user   // El usuario autenticado
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Verificar si un usuario existe por ID
const getUsuarioById = async (id) => {
    const result = await pool.query('SELECT id, email, nombre, direccion FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getUsuarios,
    registerUsuario,
    loginUsuario,
    getUsuarioById
};
