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

const loginUsuario = async (email, password) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
  
    if (result.rows.length === 0) {
      return null;
    }
  
    const user = result.rows[0];
  
    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      return null;
    }
  
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
  
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        direccion: user.direccion
      }
    };
  };
  
  const getUsuarioById = async (id) => {
    const result = await pool.query(
      'SELECT id, email, nombre, direccion FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0];
  };
  
  // Y luego lo exportas abajo
  module.exports = {
    getUsuarios,
    registerUsuario,
    loginUsuario,
    getUsuarioById 
  };
  