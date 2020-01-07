import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Persons from './components/Persons'

const ALL_PERSONS = gql`
{
  allPersons  {
    name
    phone
    id
  }
}
`

const App = () => {
  return (
    <Query query={ALL_PERSONS}>
      {(result) => <Persons result={result} />}
    </Query>
  )
}

export default App