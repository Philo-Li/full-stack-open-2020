import React, { useRef  } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const LoggedinForm = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const blogFormRef = useRef()
  const createBlogForm = () => (
    <Togglable id='create-blog' buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm blogFormRef={blogFormRef}/>
    </Togglable>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {createBlogForm()}
      <div>
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>)}
      </div>
    </div>
  )
}

export default LoggedinForm