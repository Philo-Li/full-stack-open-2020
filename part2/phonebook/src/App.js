import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification] = useState('Welcome to phonebook')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
        .then(response => {
          setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.find(element => element.name === newName)){
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if(replace){
        console.log(replace)
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        console.log('changedPerson', changedPerson)
        personService
          .update(person.id, changedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            setNotification(`Updated ${newName}'s number`);
          })
          .catch(error => {
            console.log('fail')
          })
      }
    }else{
      personService
      .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNotification(`Added ${newName}`);
      })
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h2>Add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} setNotification={setNotification}/>
      
    </div>
  )
}

export default App