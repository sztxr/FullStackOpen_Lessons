import React from 'react'

const NoteForm = ({ handleSubmit, data, handleNoteChange }) => {
  return (
    <form onSubmit={handleSubmit} className="form-note">
      <input
        id="newNote"
        type="text"
        value={data}
        onChange={handleNoteChange}
      />
      <button id="btn-save" className="btn btn-primary" type="submit">Save</button>
    </form>
  )
}

export default NoteForm