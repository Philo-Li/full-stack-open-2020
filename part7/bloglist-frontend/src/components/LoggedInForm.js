import React, { useRef  } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
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

  const detailForm = () => (
    <div>
      <ul>
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </ul>
    </div>
  )

  return (
    <div>
      {createBlogForm()}
      {detailForm()}
    </div>
  )
}

export default LoggedinForm