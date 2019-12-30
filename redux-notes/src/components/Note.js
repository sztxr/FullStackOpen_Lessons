// Presentational component: it's just responsible for rendering a single note
import React from 'react'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? '— important' : ''}</strong>
    </li>
  )
}

export default Note