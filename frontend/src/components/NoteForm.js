import React from 'react'

const NoteForm = ({ handleSubmit, data, handleNoteChange }) => {
  return (
    <form onSubmit={handleSubmit} className="form-note">
      <input
        type="text"
        value={data}
        onChange={handleNoteChange}
      />
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  )
}

export default NoteForm