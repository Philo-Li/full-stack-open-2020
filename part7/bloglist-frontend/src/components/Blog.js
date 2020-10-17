import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import  { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, addComment, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const newComment = useField('newComment')
  if(!blogs) return null

  const blog = blogs.find(a => String(a.id) === String(id))

  const handleLike = async(blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Blog ${blog.title} likes + 1`, 5))
    } catch(exception){
      dispatch(setNotification('Failed to like', 5))
    }
  }

  // const buttonStyle = {
  //   color: 'blue'
  // }

  // const handleDelete = async(blogToDelete) => {
  //   const answer = window.confirm(`Delete Blog ${blogToDelete.title}?`)
  //   if(answer){
  //     try {
  //       dispatch(deleteBlog(blog))
  //       dispatch(setNotification(`Deleted Blog: ${blogToDelete.title}`, 5))
  //     } catch(exception){
  //       dispatch(setNotification('Failed to Delete', 5))
  //     }
  //   }
  // }

  const handleComment = async(event) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog, newComment.value))
      dispatch(setNotification(`a new comemnt ${newComment.value} added`, 5))
    } catch(exception){
      dispatch(setNotification('Failed to add new blog', 5))
    }
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button variant='info' id='like-button' onClick={() => handleLike(blog)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {/* <button id='remove-button' style={buttonStyle} onClick={() => handleDelete(blog)}>Remove</button> */}
      <h3>comments</h3>
      <form id='comemntform' onSubmit={handleComment}>
        <div>
          <input {...newComment}/>
        </div>
        <Button variant='primary' id='comment-button' type='submit'>add comment</Button>
      </form>
      <div>
        {blog.comments.map((comment) =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </div>
    </div>
  )}

export default Blog
