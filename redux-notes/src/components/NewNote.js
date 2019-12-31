import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = props => {
  const addNote = async (e) => {
    e.preventDefault()
    // because the field has a name, we can access the content via the event object event.target.note.value
    const content = e.target.note.value
    e.target.note.value = ''
    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(
  null,
  { createNote }
)(NewNote)

/*
{ createNote } same as:

const mapDispatchToProps = dispatch => {
  return {
    createNote: value => {
      dispatch(createNote(value))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewNote)
*/