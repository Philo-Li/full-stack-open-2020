import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, FIND_BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStoreBooks = client.readQuery({ query: FIND_BOOKS_BY_GENRE, variables: { genreToSearch: '' } })
    // console.log('dataInStoreBooks1', dataInStoreBooks)
    if (!includedIn(dataInStoreBooks.allBooks, addedBook)) {
      client.writeQuery({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genreToSearch: '' },
        data:  {
          allBooks: [ ...dataInStoreBooks.allBooks, addedBook ]
        }
      })
    }
    const dataInStoreRecommend = client.readQuery({ query: FIND_BOOKS_BY_GENRE, variables: { genreToSearch: favoriteGenre } })
    // console.log('dataInStoreRecommend1', dataInStoreRecommend)
    if (!includedIn(dataInStoreRecommend.allBooks, addedBook))
      client.writeQuery({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genreToSearch: favoriteGenre },
        data:  {
          allBooks: [ ...dataInStoreRecommend.allBooks, addedBook ]
        }
      })
    }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      console.log('subscriptionData', subscriptionData)
      updateCacheWith(addedBook)
    }
  })

  const login = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
          setFavoriteGenre={setFavoriteGenre}
        />
      </div>
    )
  }

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const loggedin = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
        <NewBook
          show={page === 'add'}
        />

        <Recommend
          show={page === 'recommend'}
          favoriteGenre={favoriteGenre}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        {!token ? login() : loggedin() }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

    </div>
  )
}

export default App