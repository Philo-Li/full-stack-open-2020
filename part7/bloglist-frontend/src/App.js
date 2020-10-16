import React, { useEffect, useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

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

  const blogFormRef = useRef()
  const createBlogForm = () => (
    <Togglable id='create-blog' buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm blogFormRef={blogFormRef}/>
    </Togglable>
  )

  const detailForm = () => (
    <div>
      <ul>
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </ul>
    </div>
  )

  const handleLogout = async(event) => {
    event.preventDefault()
    dispatch(logout)
  }

  const loggedInForm = () => (
    <div>
      <p>{user.name} logged-in
        <button type='submit' onClick={handleLogout} >logout</button>
      </p>
      {createBlogForm()}
      {detailForm()}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? loginForm() : loggedInForm()}
      <Footer />
    </div>
  )
}

export default App