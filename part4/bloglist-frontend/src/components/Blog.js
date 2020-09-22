import React from 'react'
import DetailTogglable from './DetailTogglable'

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const handleLike = async(event) => {
  //   event.preventDefault()
    
  // }

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
      </DetailTogglable>
    </div>
  )}

export default Blog
