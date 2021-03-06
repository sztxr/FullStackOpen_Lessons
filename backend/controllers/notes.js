/*
    The route handlers have also been moved into a dedicated module.
    The event handlers of routes are commonly referred to as controllers,
    and for this reason we have created a new controllers directory.
    All of the routes related to notes are now in the notes.js module under the controllers directory.

    The router is in fact a middleware, that can be used for defining
    "related routes" in a single place, that is typically placed in its own module.

    This is almost an exact copy-paste of our previous index.js file.

    The module exports the router to be available for all consumers of the module.
    It's worth noting that the paths in the route handlers have shortened. In the previous version, we had:
    app.delete('/api/notes/:id', (request, response) => {

    And in the current version, we have:
    notesRouter.delete('/:id', (request, response) => {
*/
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// GET

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note.toJSON())
    } else {
      response.status(404).end()
    }
  }
  catch (exception) {
    next(exception)
  }

  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note.toJSON())
  //     } else {
  //       response.status(204).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

// POST

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      // 401 unauthorized
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
      user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote.toJSON())
  }
  catch (exception) {
    next(exception)
  }

  // note
  //   .save()
  //   .then(savedNote => savedNote.toJSON())
  //   .then(savedAndFormattedNote => {
  //     response.json(savedAndFormattedNote)
  //   })
  //   .catch(error => next(error))
})

// PUT

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedNote = Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote.toJSON())
  }
  catch (exception) {
    next(exception)
  }

  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote.toJSON())
  //   })
  //   .catch(error => next(error))
})

// DELETE

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end() // 204 No Content
  }
  catch (exception) {
    next(exception)
  }

  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     // 204 no content
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

module.exports = notesRouter