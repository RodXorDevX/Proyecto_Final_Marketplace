const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_marketplace_2',
    password: 'Pg123456',
    port: 5432,
});

module.exports = pool;
