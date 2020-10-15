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
            id='title'
            type="text"
            value={title}
            className="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            value={author}
            className="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            value={url}
            className="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='save-button' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm