import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState('Welcome to Bloglist')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async(event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        user: user._id
      }

      const returnedBlog = await blogService.create(blogObject)
      blogs.concat(returnedBlog)
      setBlogs(blogs.sort((a, b) => b.likes - a.likes - 1))

      setNotification(`a new blog ${newTitle} by ${newAuthor} added`)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch(exception){
      setNotification('Failed to add new blog')
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const handleLike = async(id) => {
    try {
      const blog = blogs.find(n => n.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      await blogService.update(changedBlog)

      blogs.sort((a, b) => b.likes - a.likes - 1)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))

      setNotification(`Blog ${blog.title} likes + 1`)

    } catch(exception){
      setNotification('Failed to like')
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        title={newTitle}
        author={newAuthor}
        url={newUrl}
        handleTitleChange={({ target }) => setNewTitle(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
        handleSubmit={addBlog}
      />
    </Togglable>
  )

  const detailForm = () => (
    <div>
      <ul>
        {blogs.map((blog) =>
          <Blog key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            handleLike={handleLike}/>
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
      <Notification message={notification} />

      {user === null ? loginForm() : loggedInForm()}

      <Footer />
    </div>
  )
}

export default App