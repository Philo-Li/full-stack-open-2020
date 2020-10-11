const initialState = ''

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export default filterReducer