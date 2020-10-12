const initialState = null

export const setTimeoutID = (timeoutID) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TIMEOUTID',
      data: timeoutID
    })
  }
}

const timeoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMEOUTID':
      return action.data
    default:
      return state
  }
}

export default timeoutReducer