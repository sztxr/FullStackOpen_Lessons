import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = props => {
  const filterSelected = value => () => { console.log(value) }

  return (
    <div>
      <NewNote store={props.store}/>

      <div>
        &ndash; all <input type="radio" name="filter" onChange={filterSelected('ALL')}/>
        &ndash; important <input type="radio" name="filter" onChange={filterSelected('IMPORTANT')}/>
        &ndash; not important <input type="radio" name="filter" onChange={filterSelected('NOT_IMPORTANT')}/>
        &ndash;
      </div>

      <Notes store={props.store}/>
    </div>
  )
}

export default App