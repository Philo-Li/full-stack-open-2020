import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))

  const filter = useSelector(state => state.filter)
  // console.log('filter', filter)
  const anecdotesToShow = !filter ? anecdotes : anecdotes.filter(anecdote => anecdote.content.toLowerCase().search(filter.toLowerCase()) !== -1)
  console.log(anecdotes)
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  setTimeout(() => {
    dispatch({ type: 'HIDE_NOTIFICATION' })
  }, 5000)

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList