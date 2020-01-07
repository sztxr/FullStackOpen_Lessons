import React from 'react'

const Persons = ({ result }) => {
  if (result.loading) return <div>loading...</div>

  const persons = result.data.allPersons 

  return (
    <div>
      <h2>Contacts</h2>
      {persons.map(p =>
        <div key={p.name}>{p.name} {p.phone}</div>  
      )}
    </div>
  )
}

export default Persons