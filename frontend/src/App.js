import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import noteService from './services/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  // get all notes on db
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  // get user details from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  // The empty array as the parameter of the effect ensures that the effect
  // is executed only when the component is rendered for the first time.

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important) // note.important === true

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log('logging in with', username, password)

    // If the login is successful, the form fields are emptied and the server response
    // (including a token and the user details) is saved to the user field of the application's state.
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      // console.log(window.localStorage)

      noteService.setToken(user.token)
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

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable
      buttonLabel='login'
      title='Login'
      classType='form'
    >
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const noteFormRef = React.createRef()

  const noteForm = () => (
    <Togglable
      buttonLabel='Create a new note'
      title='Create a new note'
      classType='form'
      ref={noteFormRef}
    >
      <NoteForm
        handleSubmit={addNote}
        data={newNote}
        handleNoteChange={handleNoteChange}
      />
    </Togglable>
  )

  const addNote = (e) => {
    e.preventDefault()
    noteFormRef.current.toggleVisibility()
    const noteObject = {
      content: newNote,
      // date: new Date().toISOString(),
      important: false
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    // console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = id => {
    // array find method to find the note we want to modify, and assign it to the `note` variable
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
      .catch(() => {
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

      {/* {user === null && loginForm()} */}
      {/* {user !== null && noteForm()} */}
      {user === null ?
        loginForm() :
        <div>
          <div className="user">
            {user.name} logged in
            <button onClick={handleLogout} className="btn btn-secondary">logout</button>
          </div>
          {noteForm()}
        </div>
      }

      <div className="wrapper">
        <button className='btn btn-primary' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul className='note-container'>
          {rows()}
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default App