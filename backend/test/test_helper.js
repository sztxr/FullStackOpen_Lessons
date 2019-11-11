/*
  The module defines the notesInDb function that can be used for checking the notes stored in the database.
  The initialNotes array containing the initial database state is also in the module.
  We also define the nonExistingId function ahead of time, that can be used for creating a
  database object ID that does not belong to any note object in the database.
*/

const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  },
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb
}