import { createSlice } from '@reduxjs/toolkit' // Just a comment

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
  
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map( a => a.id !== id ? a : votedAnecdote )
          .sort( (a,b) => b.votes - a.votes )
    },

    createAnecdote(state, action) {
      return [...state, action.payload ]
    },
    
    appendAnecdote(state, action) {
      state.push(action.payload)    
    },
    
    setAnecdotes(state, action) {
      return action.payload
    }
    
  }
})

export const {
  anecdoteReducer,
  addVote,
  createAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
