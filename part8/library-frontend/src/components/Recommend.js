import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { USER, FIND_BOOKS_BY_GENRE } from '../queries'

const Recommend = (props) => {
  const [getBooks, result] = useLazyQuery(FIND_BOOKS_BY_GENRE)
  const { loading, error, data } = useQuery(USER)

  useEffect(() => {
    if(data){
      getBooks({ variables: { genreToSearch: String(data.me.favoriteGenre) } })
    }
  }, [data])

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  let booksToShow = result.data.allBooks
  console.log(booksToShow)

  return (
    <div>
      <h2>books</h2>
      <p>books in your favorite genre: <b>{data.me.favoriteGenre}</b></p>
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