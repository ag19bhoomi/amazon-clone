const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'amazon_clone',
    password: '1234', // 👈 your password
    port: 5432,
});

module.exports = pool;