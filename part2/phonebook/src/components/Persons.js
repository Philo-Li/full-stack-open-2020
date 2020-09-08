import React from 'react'
import personsService from "../services/persons"

const Persons = ({ persons, setPersons, setNotification }) => {
  const handlePersonDelete = personToDelete => {
    const { id, name } = personToDelete
    const answer = window.confirm(`Delete ${name}?`)
    if (answer) {
      personsService
      .deletePerson(id)
      .then(data => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`Deleted ${name}`);
      })
      .catch(error => {
        setNotification(`information of ${name} has alreaddy been removed from server`);
        console.log('fail to delete')
      })
    }
    console.log(answer, id)
  }

  return (
    <li className='person'>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handlePersonDelete(person)}>Delete</button>
        </p>
      ))}
    </li>
  )
}

export default Persons