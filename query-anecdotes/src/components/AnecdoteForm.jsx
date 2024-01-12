import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests' 
import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
 
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (c) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch("anecdote '"+c.content+"' created")
      setTimeout(() => {dispatch("")}, 5000)
    },
    onError: (c) => {
      console.log(c.response.data.error)
      dispatch(c.response.data.error)
      setTimeout(() => {dispatch("")}, 5000)
    }
  })

  const dispatch = useNotificationDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
