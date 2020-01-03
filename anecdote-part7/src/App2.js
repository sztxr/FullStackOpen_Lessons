// For comparison here is the same application as a Functional component:
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App2 = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() =>{
    axios
      .get('http://localhost:3001/anecdotes')
      .then(response => setAnecdotes(response.data))
  },[])

  const handleClick = () => {
    setCurrent(Math.round(Math.random() * anecdotes.length))
  }

  if (anecdotes.length === 0) {
    return <div>no anecdotes...</div>
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <div>{anecdotes[current].content}</div>
      <button onClick={handleClick}>next</button>
    </div>
  )
}

export default App2