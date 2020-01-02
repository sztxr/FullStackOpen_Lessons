import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Notes app</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquid veritatis esse quo laudantium similique molestiae quos aperiam! Rerum vel praesentium explicabo sequi incidunt consectetur possimus quo nam ipsam magni!</p>
  </div>
)

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div>
    <h2>Notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const noteById = (id) => notes.find(note => note.id === Number(id))

  const padding = {
    padding: 5
  }

  const LoginNoHistory = props => {
    const onSubmit = e => {
      e.preventDefault()
      props.onLogin('mluukkai')
      props.history.push('/')
    }

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div>username: <input /></div>
          <div>password: <input /></div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const Login = withRouter(LoginNoHistory)

  return (
    <div>
      <Router>
        <div>

          <div>
            <Link style={padding} to='/'>home</Link>
            <Link style={padding} to='/notes'>notes</Link>
            <Link style={padding} to='/users'>users</Link>
            {user
              ? <em>{user} logged in</em>
              : <Link to='/login'>login</Link>
            }
          </div>

          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/notes' render={() => <Notes notes={notes} />} />
          <Route exact path='/notes/:id' render={({ match }) =>
            <Note note={noteById(match.params.id)} />}
          />
          <Route exact path='/users' render={() => <Users />} />

        </div>
      </Router>
    </div>
  )
}

export default App