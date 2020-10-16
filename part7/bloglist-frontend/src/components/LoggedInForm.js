import React, { useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { logout } from '../reducers/userReducer'

const LoggedinForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

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
    dispatch(logout())
  }

  return (
    <div>
      <p>{user.name} logged-in
        <button type='submit' onClick={handleLogout} >logout</button>
      </p>
      {createBlogForm()}
      {detailForm()}
    </div>
  )
}

export default LoggedinForm