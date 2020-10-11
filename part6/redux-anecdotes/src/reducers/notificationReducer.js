const initialState = null

export const notificationVote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return action.data.id
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer