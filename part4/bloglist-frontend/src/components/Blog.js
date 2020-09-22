import React from 'react'
import DetailTogglable from './DetailTogglable'
import blogService from "../services/blogs"


const Blog = ({ blog, blogs, setBlogs, setNotification, handleLike }) => {
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

  // const handleLike = async(event) => {
  //   event.preventDefault()
    
  // }

  const handleDelete = async(blogToDelete) => {
    const answer = window.confirm(`Delete Blog ${blogToDelete.title}?`)
    if(answer){
      try {
        const id = blogToDelete.id
        const changedBlogs = blogs.filter(blog => blog.id !== id)
        console.log(blogToDelete)
        console.log(changedBlogs)
  
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

  return(
    <div style={blogStyle}>
      {blog.title}
      <DetailTogglable buttonLabel="view" >
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={buttonStyle} onClick={() => handleDelete(blog)}>Remove</button>
      </DetailTogglable>
    </div>
  )}

export default Blog
