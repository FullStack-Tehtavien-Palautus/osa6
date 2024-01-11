import { useDispatch } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer.js'
import { notificationDrape, notificationClear } from '../reducers/notificationReducer.js'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationDrape("Anecdote created: " + content))
    setTimeout( () => dispatch(notificationClear()), 5000 )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm