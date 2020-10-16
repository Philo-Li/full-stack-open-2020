import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import LoggedInForm from './components/LoggedInForm'
import UsersForm from './components/UsersForm'
import UserForm from './components/UserForm'
import Blog from './components/Blog'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'

import { logout } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(getAllUsers())
  }, [dispatch])

  const loginForm = () => (
    <Togglable id='login' buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  const Menu = () => {
    const handleLogout = async(event) => {
      event.preventDefault()
      dispatch(logout())
    }
    if(!user) return null
    return (
      <div>
        <p>{user.name} logged-in
          <button type='submit' onClick={handleLogout} >logout</button>
        </p>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Menu />
        <Notification />
        <div>
          <Switch>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path='/users/:id'>
              <UserForm />
            </Route>
            <Route path='/users'>
              <UsersForm />
            </Route>
            <Route path='/'>
              {user === null ?
                loginForm() : <LoggedInForm />
              }
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App