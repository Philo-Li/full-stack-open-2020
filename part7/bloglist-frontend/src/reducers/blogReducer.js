import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    let blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

// export const voteAnecdote = (anecdote) => {
//   return async dispatch => {
//     const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
//     await anecdotesService.updateVote(changedAnecdote)
//     dispatch({
//       type: 'VOTE',
//       data: changedAnecdote
//     })
//   }
// }

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data )
  case 'INIT_BLOG':
    return action.data
  default:
    return state
  }
}

export default blogReducer