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

// GET

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note.toJSON())
    } else {
      response.status(204).end()
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

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  try {
    const savedNote = await note.save()
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

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
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