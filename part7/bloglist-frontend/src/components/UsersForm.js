import React from 'react'
import { useSelector } from 'react-redux'

const UsersForm = () => {
  const users = useSelector(state => state.users)
  if(!users) return null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) =>
            <tr key = {user.id} >
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersForm