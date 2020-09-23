import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, blogs, setBlogs, setNotification, handleLike }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonStyle = {
    color: 'blue'
  }

  const handleDelete = async(blogToDelete) => {
    const answer = window.confirm(`Delete Blog ${blogToDelete.title}?`)
    if(answer){
      try {
        const id = blogToDelete.id
        const changedBlogs = blogs.filter(blog => blog.id !== id)

        await blogService.deleteBlog(blogToDelete)

        setBlogs(changedBlogs)

        setNotification(`Deleted Blog: ${blogToDelete.title} `)

      } catch(exception){
        setNotification('Failed to Delete')
      }
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const detailForm = () => (
    <div className="blog-info">
      <p>
        <a href={blog.url} />
        url: {blog.url}
      </p>
      <p>
        likes: {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </p>
      <p>added by {blog.user && blog.user.name}</p>
      <button style={buttonStyle} onClick={() => handleDelete(blog)}>Remove</button>
    </div>
  )

  const changeLabel = showInfo ? 'hide' : 'view'

  return(
    <div style={blogStyle} >
      <p className="blog-title">
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>{changeLabel}</button>
      </p>
      {showInfo ? detailForm(): null}
    </div>
  )}

export default Blog
