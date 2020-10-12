const initialState = null

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'VOTE_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer