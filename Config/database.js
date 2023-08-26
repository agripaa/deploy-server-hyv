const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
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
