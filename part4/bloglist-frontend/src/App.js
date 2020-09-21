import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      setNotification('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
        setNotification(null)
      }, 5000)
    }
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
    // <form onSubmit={addBlog}>
    //   <input
    //     value={newNote}
    //     onChange={handleNoteChange}
    //   />
    //   <button type="submit">save</button>
    // </form>  
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogForm()}
      </div>
    }

      
    </div>
  )
}

export default App