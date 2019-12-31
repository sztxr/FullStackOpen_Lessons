import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = props => {
  const { filterChange } = props

  const filterSelected = value => () => filterChange(value)

  return (
    <div>
      all <input type="radio" name="filter" onChange={filterSelected('ALL')} /> |
      important <input type="radio" name="filter" onChange={filterSelected('IMPORTANT')} /> |
      not important <input type="radio" name="filter" onChange={filterSelected('NOT_IMPORTANT')} />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(VisibilityFilter)