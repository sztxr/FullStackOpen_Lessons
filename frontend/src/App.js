import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important) // note.important === true

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    // If the login is successful, the form fields are emptied and the server response
    // (including a token and the user details) is saved to the user field of the application's state.
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    }
    // If the login fails, or running the function loginService.login results in an error, the user is notified.
    catch (exception) {
      setErrorMessage('Invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const loginForm = () => (
    // An object is given to the event handler as a parameter,
    // and it destructures the field target from the object and save its value to the state.
    <form onSubmit={handleLogin} className="form-login">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        type="text"
        value={newNote}
        onChange={handleNoteChange}
      />
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  )

  const handleNoteChange = (e) => {
    // console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    // array find method to find the note we want to modify, and assing it to the `note` variable
    const note = notes.find(n => n.id === id)
    // then we create a new object that is the exact copy of the note we saved,
    // apart from the important property, which we toggle to be the opposite of its previous value
    const changedNote = { ...note, important: !note.important } // shallow copy

    // The callback function sets the component's notes state to a new array that
    // contains all the items from the previous notes array, except for the old note
    // which is replaced by the updated version of it returned by the server:
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // if note.id !== id is true, we simply copy the item from the old array into the new array
        // if the condition is false, then the note object returned by the server is added to the array instead.
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(err => {
        setErrorMessage(`The note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //return an array with only the items from the list for which n.id !== id return true for
        setNotes(notes.filter(n => n.id !== id))
      })

  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <h2>Login</h2>
      
      {/* {user === null && loginForm()} */}
      {/* {user !== null && noteForm()} */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

      <br />

      <div>
        <button className='btn btn-primary' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul className='note-container'>
        {rows()}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App