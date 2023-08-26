const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
