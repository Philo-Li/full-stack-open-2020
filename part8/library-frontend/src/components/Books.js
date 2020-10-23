import React, { useState, useEffect } from 'react'
import { useQuery,useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [select, setSelect] = useState('')
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(FIND_BOOKS_BY_GENRE)

  useEffect(() => {
    getBooks({ variables: { genreToSearch: String(select) } })
  }, [select])

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const books = data.allBooks
  let booksToShow = result.data ? result.data.allBooks : books

  console.log(books)
  console.log('select', select)
  console.log('result', result.data)

  let allGenres = []

  books.map((book) => {
    book.genres.map((genre) => {
      if(!allGenres.includes(genre)){
        allGenres = [...allGenres, genre]
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
      {/* {select ? <Book select={select}></Book> : null} */}
      {allGenres.map(a => 
        <button key={a} onClick={() => setSelect(a)}>{a}</button>
      )}
      <button key='allGenres' onClick={() => setSelect('')}>all genres</button>
    </div>
  )
}

export default Books