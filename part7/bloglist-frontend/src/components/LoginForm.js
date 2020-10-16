import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { useField } from '../hooks'
import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('username')
  const password = useField('password')

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(setNotification('succeed logged in', 5))
      console.log(user)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form id='loginform' onSubmit={handleLogin}>
        <div>
          username
          <input {...username}/>
        </div>
        <div>
          password
          <input {...password}/>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm