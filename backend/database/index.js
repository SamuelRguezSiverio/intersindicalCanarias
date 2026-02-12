const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql', 
  port: process.env.DB_PORT || 3306,
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
});

async function checkConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection established succesfully')
  } catch (error) {
    throw error
  }
}

async function syncModels() {
  try {
    await sequelize.sync({ alter: true })
    console.log('Models synchronized')
  } catch (error) {
    throw error
  }
}

module.exports = {
  sequelize,
  checkConnection,
  syncModels
}
