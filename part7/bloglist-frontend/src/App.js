import React, { useEffect, useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'CLEAR_USER' })
  }

  const loginForm = () => (
    <Togglable id='login' buttonLabel='login' ref={blogFormRef}>
      <LoginForm />
    </Togglable>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
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

  const loggedInForm = () => (
    <div>
      <p>{user.name} logged-in
        <button type='submit' onClick={handleLogout} >logout</button>
      </p>
      {blogForm()}
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