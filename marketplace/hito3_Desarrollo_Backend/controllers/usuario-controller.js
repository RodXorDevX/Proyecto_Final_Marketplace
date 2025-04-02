const usuarioModel = require('../models/usuario-model');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error obteniendo los usuarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Registrar un nuevo usuario
const registerUsuario = async (req, res) => {
    try {
        const userData = req.body;
        const nuevoUsuario = await usuarioModel.registerUsuario(userData);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Autenticar un usuario
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.loginUsuario(email, password);
        
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        res.json(usuario);
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getUsuarios,
    registerUsuario,
    loginUsuario
};
