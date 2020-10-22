import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [select, setSelect] = useState(null)
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const books = data.allBooks
  let booksToShow = select ? books.filter((book) => book.genres.includes(select) === true) : books

  console.log(books)

  let allGenres = []

  books.map((book) => {
    book.genres.map((genre) => {
      if(!allGenres.includes(genre)){
        allGenres = [...allGenres, genre]
        console.log(genre, allGenres)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>
      {select ? (
        <p>in genre <b>{select}</b></p>
      ):(
        <p><b>all genres</b></p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {allGenres.map(a => 
        <button key={a} onClick={() => setSelect(a)}>{a}</button>
      )}
      <button key='allGenres' onClick={() => setSelect(null)}>all genres</button>
    </div>
  )
}

export default Books