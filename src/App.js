import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }
  useEffect(hook, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important) // note.important === true

  const toggleImportance = id => {
    // console.log(`importance of ${id} needs to be toggled`)

    // define unique url for each note resource based on its id
    const url = `http://localhost:3001/notes/${id}`
    // array find method to find the note we want to modify, and assing it to the `note` variable
    const note = notes.find(n => n.id === id)
    // then we create a new object that is the exact copy of the note we saved,
    // apart from the important property, which we toggle to be the opposite of its previous value
    const changedNote = { ...note, important: !note.important } // shallow copy

    // The callback function sets the component's notes state to a new array that
    // contains all the items from the previous notes array, except for the old note
    // which is replaced by the updated version of it returned by the server:
    axios
      .put(url, changedNote)
      .then(res => setNotes(notes.map(note => note.id !== id ? note : res.data)))
    // if note.id !== id is true, we simply copy the item from the old array into the new array
    // if the condition is false, then the note object returned by the server is added to the array instead.
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportance(note.id)}
    />
  )

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }
    // // setNotes(notes.concat(noteObject))
    // setNotes([...notes, noteObject])
    // setNewNote('')
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(res => {
        // console.log(res)
        setNotes([...notes, res.data])
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    // console.log(e.target.value)
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App