/*
  The handling of environment variables is extracted into a separate utils/config.js file
  Other parts of the app can access the environment variables by importing the configuration module:
  eg:
  const config = require('./utils/config')
  console.log(`Server running on port ${config.PORT}`)
*/

require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI }