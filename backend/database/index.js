const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
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
