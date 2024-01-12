import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import axios from 'axios'

const App = () => {
	const queryClient = useQueryClient()
	const newVoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (r) => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		}
	})
	
	const dispatch = useNotificationDispatch()
	const handleVote = (anecdote) => {
		newVoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
		dispatch("anecdote '"+anecdote.content+"' voted")
		setTimeout(() => {dispatch("")}, 5000)
	}

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
	})
	if ( result.isError ) {
		return <div>anecdote server not aviable due to problems in server</div>
	}
	if ( result.isLoading ) {
		return <div>loading data...</div>
	}
	
	const anecdotes = result.data


	return (
		<div>
			<h3>Anecdote app</h3>
    
			<Notification />
			<AnecdoteForm />
    
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>has {anecdote.votes}
						<button onClick={
						() => handleVote(anecdote)
						}>vote</button>
         				</div>
        			</div>
      			)}
		</div>
	)
}

export default App
