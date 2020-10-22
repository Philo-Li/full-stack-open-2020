import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [nameSelected, setNameSelected] = useState(null)
  const [born, setBorn] = useState('')
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [ editBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const authors = data.allAuthors
  console.log(authors)

  const submit = async (event) => {
    event.preventDefault()
    const name = nameSelected.value
    
    console.log('edit birthyear...', name, born)
  
    editBorn({  variables: { name, born } })
    setBorn('')
  }

  const authorsOption = authors.map(a => 
    {const result = {value: a.name, label: a.name}
    return result}
    )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={nameSelected}
          onChange={setNameSelected}
          options={authorsOption}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
