import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'mark as not important' : 'mark as important'
  return (
    <li className='note'>
      {note.content}
      <button className='btn btn-secondary' onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note