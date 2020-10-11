import anecdotesService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdotesService.updateVote(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data )
    case 'INIT_ANECDOTE':
      return action.data
    default:
    return state
  }
}

export default anecdoteReducer