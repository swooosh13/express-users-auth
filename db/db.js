const Sequelize = require('sequelize');

module.exports = new Sequelize(
  "node_postgres", // db
  "postgres", // username
  "admin", // password
  {
    dialect: "postgres",
    host: "localhost"
  }
);
