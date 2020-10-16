const initialUser = null

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export default userReducer