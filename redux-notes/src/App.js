import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = props => {
  return (
    <div>
      <NewNote store={props.store}/>
      <VisibilityFilter store={props.store}/>
      <Notes store={props.store}/>
    </div>
  )
}

export default App