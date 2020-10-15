import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import timeoutReducer from './reducers/timeoutReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  // anecdotes: anecdoteReducer,
  // filter: filterReducer,
  notification: notificationReducer,
  timeoutID: timeoutReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store