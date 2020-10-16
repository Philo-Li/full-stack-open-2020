import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { useField } from '../hooks'

import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const CreateBlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const newTitle = useField('newTitle')
  const newAuthor = useField('newAuthor')
  const newUrl = useField('newUrl')

  const createBlog = async(event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const blogObject = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
        user: user._id
      }

      dispatch(addBlog(blogObject))

      dispatch(setNotification(`a new blog ${newTitle.value} by ${newAuthor.value} added`, 5))

    } catch(exception){
      dispatch(setNotification('Failed to add new blog', 5))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input {...newTitle} />
        </div>
        <div>
          author
          <input {...newAuthor} />
        </div>
        <div>
          url
          <input {...newUrl} />
        </div>
        <button id='save-button'>save</button>
      </form>
    </div>
  )
}

export default CreateBlogForm