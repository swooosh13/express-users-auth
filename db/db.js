const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_DATABASE, // db
  process.env.DB_USER, // username
  process.env.DB_PASSWORD, // password
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
