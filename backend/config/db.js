require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with Postgres config from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
);

// Test DB connection 
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL successfully'))
  .catch(err => console.error('DB connection error:', err));

module.exports = sequelize;