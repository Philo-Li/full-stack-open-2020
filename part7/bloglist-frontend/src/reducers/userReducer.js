import blogService from '../services/blogs'

const initialUser = null

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'CLEAR_USER' })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer