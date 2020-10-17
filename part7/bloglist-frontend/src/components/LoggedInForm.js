import React, { useRef  } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
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

  return (
    <div>
      {createBlogForm()}
      <div>
        <Table striped>
          <tbody>
            {blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>
                  {blog.user.name}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default LoggedinForm