import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

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

const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone)  {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  return (
    <div>
      {errorMessage &&
        <div style={{ color: 'red' }}>{errorMessage}</div>
      }

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
        onError={handleError}
      >
        {(addPerson) => <PersonForm addPerson={addPerson} />}
      </Mutation>

      <h2>change number</h2>
      <Mutation mutation={EDIT_NUMBER}>
        {(editNumber) => <PhoneForm editNumber={editNumber} />}
      </Mutation>
    </div>
  )
}

export default App