import React from 'react'
import DetailTogglable from './DetailTogglable'

const Blog = ({ blog, like }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <button onClick={like}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </DetailTogglable>
    </div>
  )}

export default Blog
