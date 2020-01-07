# Full Stack Open 2019 &mdash; GraphQL Exercise
### **Phonebook App** with *GraphQL* (backend)

### &mdash; Start GraphQL-playground: `npm start`

### &mdash; Query for fetching a single person
```js
query {
  findPerson(name: "Arto Hellas") {
    phone 
    address {
      city 
      street
    }
  }
}
```

### &mdash; Filter the query returning all persons with the parameter phone so, that it returns only persons with or without a phone number
```js
query {
  allPersons(phone: YES) {
    name
    phone 
  }
}

query {
  allPersons(phone: NO) {
    name
    phone 
  }
}
```

### &mdash; Combining queries.
In some cases it might be beneficial to name the queries. This is the case especially when the queries or mutations have parameters.
```js
query {
  personCount
  allPersons {
    name
  }
}

query stats {
  personCount
}

query phoneOwnership {
  havePhone: allPersons(phone: YES){
    name
  }
  noPhone: allPersons(phone: NO){
    name
  }
}
```

### &mdash; A new person can be added with the following mutation
```js
mutation {
  addPerson(
    name: "Pekka Mikkola"
    phone: "045-2374321"
    street: "Vilppulantie 25"
    city: "Helsinki"
  ) {
    name
    phone
    address{
      city
      street
    }
    id
  }
}
```

### &mdash; Mutation for changing the phone number of a person
```js
mutation {
  editNumber(
    name: "Arto Hellas"
    phone: "045-2374321"
  ) {
    name
    phone
    address{
      city
      street
    }
    id
  }
}
```