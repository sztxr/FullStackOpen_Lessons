import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
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
    <ApolloConsumer>
      {(client =>
        <Query query={ALL_PERSONS}>
          {(result) => <Persons result={result} client={client} />}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default App