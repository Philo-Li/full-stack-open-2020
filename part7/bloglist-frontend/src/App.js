import React, { useState, useEffect, useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'


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
      blogService.setToken(user.token)
    }
  }, [])

  // const handleLike = async(id) => {
  //   try {
  //     const blog = blogs.find(n => n.id === id)
  //     const changedBlog = { ...blog, likes: blog.likes + 1 }

  //     await blogService.update(changedBlog)

  //     blogs.sort((a, b) => b.likes - a.likes - 1)
  //     setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))

  //     dispatch(setNotification(`Blog ${blog.title} likes + 1`, 5))
  //   } catch(exception){
  //     dispatch(setNotification('Failed to like', 5))
  //   }
  // }

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
          <Blog key={blog.id}
            blog={blog}
            blogs={blogs}/>
        )}
      </ul>
    </div>
  )

  const loggedInForm = () => (
    <div>
      <p>{user.name} logged-in
        <button type="submit" onClick={handleLogout} >logout</button>
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