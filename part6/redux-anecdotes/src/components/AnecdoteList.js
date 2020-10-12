import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  // const filter = useSelector(state => state.filter)

  const anecdotesToShow = !props.filter ? props.anecdotes : props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().search(props.filter.toLowerCase()) !== -1)
  console.log(props.anecdotes)
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    clearTimeout(props.timeoutID)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
    filter: state.filter,
    timeoutID: state.timeoutID
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdotes
