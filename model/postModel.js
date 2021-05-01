const Sequelize = require('sequelize');
const {db} = require('../db/index');

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Post;