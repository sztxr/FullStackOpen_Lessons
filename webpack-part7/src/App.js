import React, { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div className="container">
      Hello Webpack {counter} clicks
      <button onClick={() => setCounter(counter + 1)}>press</button>
    </div>
  )
}

export default App