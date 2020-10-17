import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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
      <Form id='loginform' onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control {...username}/>
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control {...password}/>
          </div>
          <Button variant='primary' id='login-button' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm