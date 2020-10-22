import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, { loading, error, data } ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ALL_BOOKS, }, {query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if ( data ) {
      const token = data.login.value
      setToken(token)
      setPage('authors')
      console.log('token:', token)
      localStorage.setItem('library-user-token', token)
      console.log('localStorage:', localStorage)
    }
  }, [data]) // eslint-disable-line

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('login...')

    login({  variables: { username, password } })
    console.log(loading, error, data)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type ='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm