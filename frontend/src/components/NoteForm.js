import React from 'react'

const NoteForm = (props) => {
  const { addNote, data, handleNoteChange } = props

  return (
    <form onSubmit={addNote} className="form-note">
      <input
        type="text"
        value={data}
        onChange={handleNoteChange}
      />
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  )
}

export default NoteForm