import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = ({ store }) => {
  const filterSelected = value => () => {
    store.dispatch(filterChange(value))
  }

  return (
    <div>
      all <input type="radio" name="filter" onChange={filterSelected('ALL')} /> |
      important <input type="radio" name="filter" onChange={filterSelected('IMPORTANT')} /> |
      not important <input type="radio" name="filter" onChange={filterSelected('NOT_IMPORTANT')} />
    </div>
  )
}

export default VisibilityFilter