const initialState = null

export const setNotification = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer