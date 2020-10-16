import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div className='error' style={style}>
      {notification}
    </div>
  )
}

export default Notification