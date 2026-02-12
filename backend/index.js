require('dotenv').config()
const { checkConnection, syncModels } = require('./database/index')
const User = require('./database/relations.js')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncPostgreSQL() {
  await checkConnection()
  await syncModels()
}

const path = require('path')

function initializeAndListenWithExpress() {
  const app = express()
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', require('./api/routes'))
    
  // Serve static files from frontend
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
  })

  app.listen(process.env.PORT, () => {
    console.log(`> Listening on port: ${process.env.PORT}`)
  })
}

async function startAPI() {
  await checkAndSyncPostgreSQL()
  initializeAndListenWithExpress()
}

startAPI()
