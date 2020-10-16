import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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
      <div>
        {user.blogs.map((blog) =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </div>
    </div>
  )
}

export default UserForm