import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserForm = () => {
  const users = useSelector(state => state.users)

  const id = useParams().id
  if(!users) return null
  const user = users.find(a => String(a.id) === String(id))
  console.log(user)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) =>
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default UserForm