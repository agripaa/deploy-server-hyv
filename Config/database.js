const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config();

const db = new Sequelize(process.env.DB_URL, {
    dialect: process.env.DATABASE,
    dialectOptions: {
        ssl: JSON.parse(process.env.DB_SSL || '{"rejectUnauthorized":true}')
    },
    dialectModule: mysql2
});

(async () => {
    try {
        await db.authenticate();
        console.log('Database authentication successful!');
    } catch (err) {
        console.error('Database authentication failed:', err);
    }
})();

module.exports = db;
