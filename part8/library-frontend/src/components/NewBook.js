import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { USER, ADD_BOOK, FIND_BOOKS_BY_GENRE, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const user = useQuery(USER)

  const [ createBook, { loading, error, data } ] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      const dataInStoreBooks = store.readQuery({ query: FIND_BOOKS_BY_GENRE, variables: { genreToSearch: '' } })
      // console.log('dataInStoreBooks1', dataInStoreBooks, response)
      store.writeQuery({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genreToSearch: '' },
        data:  {
          allBooks: [ ...dataInStoreBooks.allBooks, response.data.addBook ]
        }
      })
      const favoriteGenre = String(user.data.me.favoriteGenre)
      const dataInStoreRecommend = store.readQuery({ query: FIND_BOOKS_BY_GENRE, variables: { genreToSearch: favoriteGenre } })
      // console.log('dataInStoreRecommend1', dataInStoreRecommend, response)
      store.writeQuery({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genreToSearch: favoriteGenre },
        data:  {
          allBooks: [ ...dataInStoreRecommend.allBooks, response.data.addBook ]
        }
      })
    }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    createBook({  variables: { title, author, published, genres } })
    console.log(loading, error, data)

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook