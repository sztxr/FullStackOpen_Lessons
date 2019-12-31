import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = props => {
  const { createNote } = props

  const addNote = e => {
    e.preventDefault()
    // because the field has a name, we can access the content via the event object event.target.note.value
    const content = e.target.note.value
    createNote(content)
    e.target.note.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}
/*
    { createNote } same as: 
    
    const mapDispatchToProps = {
      createNote,
    }
    export default connect(
      null,
      mapDispatchToProps
    )(NewNote)
*/

export default connect(
  null,
  { createNote }
)(NewNote)