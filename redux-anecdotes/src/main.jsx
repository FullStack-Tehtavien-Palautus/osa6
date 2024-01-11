import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import anecdoteService from './services/anecdotes'

import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	filter: filterReducer,
	notification: notificationReducer
})

const store = createStore(reducer)

anecdoteService.getAll()
	.then(as => as.forEach(a => store.dispatch(appendAnecdote(a))) )


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)