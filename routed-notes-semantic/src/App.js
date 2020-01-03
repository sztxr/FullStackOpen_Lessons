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
    <h2>Users</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

let Login = props => {
  const onSubmit = e => {
    e.preventDefault()
    props.onLogin('eszter')
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

Login = withRouter(Login)

const App = () => {
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

  const [user, setUser] = useState(null)
  const login = user => setUser(user)

  const noteById = (id) => notes.find(note => note.id === Number(id))

  const padding = { padding: 5 }

  return (
    <div className="container">
      <Router>
        <div>

          <div>
            {user
              ? <>
                <Link style={padding} to='/'>home</Link>
                <Link style={padding} to='/notes'>notes</Link>
                <Link style={padding} to='/users'>users</Link>
                <em>{user} logged in</em>
              </>
              : <Link to='/login'>login</Link>
            }
          </div>

          <Route exact path='/' render={() =>
            !user
              ? <><Home /> <Login onLogin={login} /></>
              : <Home />
          } />
          <Route exact path='/notes' render={() =>
            user ? <Notes notes={notes} /> : <Redirect to='/login' />
          } />
          <Route exact path='/notes/:id' render={({ match }) =>
            user ? <Note note={noteById(match.params.id)} /> : <Redirect to='/login' />
          } />
          <Route exact path='/users' render={() =>
            user ? <Users /> : <Redirect to='/login' />
          } />
          <Route path='/login' render={() => {
            if (!user) return (<Login onLogin={login} />)
          }} />

        </div>
      </Router>

      <div>
        <br />
        <em>Note app, Department of Computer Science 2019</em>
      </div>
    </div>
  )
}

export default App