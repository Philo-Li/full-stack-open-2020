import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const id = useSelector(state => state.notification)
  const anecdote = useSelector(state => state.anecdotes.find(n => n.id === id))
  let notification
  
  if(id){
    notification = `you voted '${anecdote.content}'`
  }

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification