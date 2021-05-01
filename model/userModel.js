const Sequelize = require('sequelize');
const {db} = require('../db/index');
const Post = require('../model/postModel');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  }
});

User.hasMany(Post, {onDelete: "cascade"});

module.exports = User;
