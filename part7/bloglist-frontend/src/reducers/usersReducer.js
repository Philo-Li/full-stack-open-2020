import userService from '../services/users'

const initialUser = null

export const getAllUsers = () => {
  return async dispatch => {
    let users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      data: users
    })
  }
}

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'GET_ALL_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer