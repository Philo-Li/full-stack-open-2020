import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value
    dispatch(setFilter(value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter:
      <input 
        onChange={handleChange} />
    </div>

  )
}

const ConnectedAnecdotes = connect(null)(Filter)

export default ConnectedAnecdotes