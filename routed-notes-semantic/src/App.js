import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Container, Table, Form, Button, Message } from 'semantic-ui-react'

const Home = () => (
  <div>
    <h2>Notes app</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquid veritatis esse quo laudantium similique molestiae quos aperiam! Rerum vel praesentium explicabo sequi incidunt consectetur possimus quo nam ipsam magni!</p>
  </div>
)

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped celled>
      <Table.Body>
        {notes.map(note =>
          <Table.Row key={note.id}>
            <Table.Cell>
              <Link to={`/notes/${note.id}`}>
                {note.content}
              </Link>
            </Table.Cell>
            <Table.Cell>
              {note.user}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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
      <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>username</label>
        <input name='username' />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input type='password' />
      </Form.Field>
      <Button type='submit'>login</Button>
    </Form>
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
  const [message, setMessage] = useState(null)

  const login = user => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const noteById = (id) => notes.find(note => note.id === Number(id))

  const padding = { padding: 5 }

  return (
    <Container>
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

          {(message &&
            <Message success>{message}</Message>
          )}

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
    </Container>
  )
}

export default App