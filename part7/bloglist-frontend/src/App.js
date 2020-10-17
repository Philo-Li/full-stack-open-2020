import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

import Notification from './components/Notification'
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

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    const handleLogout = async(event) => {
      event.preventDefault()
      dispatch(logout())
    }
    if(!user) return null
    return (
      // <div>
      //   <a href='/blogs' style={padding}>blogs</a>
      //   <a href='/users' style={padding}>users</a>
      //   <a>{user.name} logged-in
      //     <button type='submit' onClick={handleLogout} >logout</button>
      //   </a>
      // </div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="/blogs" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="/users" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Button variant='secondary' type='submit' onClick={handleLogout} >logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <Router>
      <div className='container'>
        <Menu />
        <h2>blogs</h2>
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
                <LoginForm /> : <LoggedInForm />
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