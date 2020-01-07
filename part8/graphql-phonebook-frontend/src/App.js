import React from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const ALL_PERSONS = gql`
{
  allPersons  {
    name
    phone
    id
  }
}
`

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const App = () => {
  return (
    <div>
      <ApolloConsumer>
        {(client) =>
          //pollInterval={} makes the changes visible immediately after adding a new person
          // but this signifies pointless web traffic
          <Query query={ALL_PERSONS}>
            {(result) => <Persons result={result} client={client} />}
          </Query>
        }
      </ApolloConsumer>

      <h2>create new</h2>
      {/* refetchQueries={}  queries ALL_PERSONS only after a person is added */}
      {/* there is no extra web traffic, but the changes won't show to other users immediately */}
      <Mutation
        mutation={CREATE_PERSON}
        refetchQueries={[{ query: ALL_PERSONS }]}
      >
        {(addPerson) => <PersonForm addPerson={addPerson} />}
      </Mutation>
    </div>
  )
}

export default App