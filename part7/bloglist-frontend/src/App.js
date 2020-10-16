import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import LoggedInForm from './components/LoggedInForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const loginForm = () => (
    <Togglable id='login' buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        loginForm() : <LoggedInForm />
      }
      <Footer />
    </div>
  )
}

export default App