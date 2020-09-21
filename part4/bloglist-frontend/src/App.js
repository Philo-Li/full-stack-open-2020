import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  // const [errorMessage, setErrorMessage] = useState(null)
  const [ notification, setNotification] = useState('Welcome to Bloglist')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        user: user._id
      }
    
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
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
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in
          <button type="submit" onClick={handleLogout} >logout</button>
        </p>
        <h2>create new</h2>
        {blogForm()}
        <ul>
          {blogs.map((blog) =>
            <Blog key={blog.id} blog={blog} />
          )}
    </ul>
      </div>
    } 
    </div>
  )
}

export default App