import React from 'react'
import { createNote } from '../reducers/noteReducer'

const NewNote = props => {
  const addNote = e => {
    e.preventDefault()
    // because the field has a name, we can access the content via the event object event.target.note.value
    const content = e.target.note.value
    props.store.dispatch(createNote(content))
    e.target.note.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote