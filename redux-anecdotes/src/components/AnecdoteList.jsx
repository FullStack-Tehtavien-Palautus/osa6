import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer.js'
import { notificationDrape, notificationClear } from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter( a => a.content.includes(state.filter) )
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(notificationDrape("Anecdote voted: " + anecdote.content))
    setTimeout( () => dispatch(notificationClear()), 5000 )
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList