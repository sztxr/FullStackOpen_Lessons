import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in a redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

function App() {
  const addNote = e => {
    e.preventDefault()
    // because the field has a name, we can access the content via the event object event.target.note.value
    const content = e.target.note.value
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    })
    e.target.note.value = ''
  }

  const toggleImportance = id => () => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note"/>
        <button type="submit">add</button>
      </form>

      <ul>
        {store.getState().map(note =>
          <li key={note.id} onClick={toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? '— important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
