// server/config/db.js
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite', // 或改为 'mysql'
  storage: 'D:\\dev\\file_core\\stock.db',
  logging: false
})

module.exports = sequelize
