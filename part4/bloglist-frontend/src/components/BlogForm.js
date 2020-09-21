import React from 'react'

const BlogForm = ({ 
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit
}) => {
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">save</button>
        </form>  
      </div>
  )
}

export default BlogForm