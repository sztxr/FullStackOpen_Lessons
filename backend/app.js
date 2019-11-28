/*
  The app.js file that creates the actual application, takes the router into use as shown below:
  const notesRouter = require('./controllers/notes')
  app.use('/api/notes', notesRouter)

  The router we defined earlier is used if the URL of the request starts with /api/notes.
  For this reason, the notesRouter object must only define the relative parts of the routes,
  i.e. the empty path / or just the parameter /:id.

  The responsibility of establishing the connection to the database has been given to the app.js module.
*/

const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

/*
    The router we defined earlier is used if the URL of the request starts with /api/notes.
    For this reason, the notesRouter object must only define the relative parts of the routes,
    i.e. the empty path / or just the parameter /:id.
*/
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app