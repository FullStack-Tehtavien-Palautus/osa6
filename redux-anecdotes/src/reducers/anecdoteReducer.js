import { createSlice } from '@reduxjs/toolkit' // Just a comment
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
  
    appendAnecdote(state, action) {
      state.push(action.payload).sort( (a,b) => b.votes - a.votes )
    },
    
    setAnecdotes(state, action) {
      return action.payload.sort( (a,b) => b.votes - a.votes )
    },
    
    replaceAnecdote(state, action) {
      return state.map( a => a.id !== action.payload.id ? a : action.payload )
          .sort( (a,b) => b.votes - a.votes )
    }
    
  }
})

export const {
//  anecdoteReducer,
  appendAnecdote,
  setAnecdotes,
  replaceAnecdote
} = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const votedAnecdote = { ...content, votes: content.votes + 1 }
    const replacedAnecdote = await anecdoteService.replace(votedAnecdote)
    dispatch(replaceAnecdote(replacedAnecdote))
  }
}

export default anecdoteSlice.reducer
