import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const result = useQuery(USER)

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const books = data.allBooks
  const select = result.data.me.favoriteGenre
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
      <p>books in your favorite genre: <b>{select}</b></p>
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
    </div>
  )
}

export default Recommend