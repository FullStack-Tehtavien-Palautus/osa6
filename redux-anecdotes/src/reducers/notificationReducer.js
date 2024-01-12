import { createSlice } from '@reduxjs/toolkit' // Just a commnet
import { useDispatch } from 'react-redux'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome!',
  reducers: {
  
    notificationDrape(state, action) {
      return action.payload
    },
    
    notificationClear(state, action) {
      return null
    }
  
  }
})

export const { notificationDrape, notificationClear } =
    notificationSlice.actions

export const setNotification = (msg, timeout) => {
  return async dispatch => {
    dispatch(notificationDrape(msg))
    setTimeout(() => dispatch(notificationClear()), 1000*timeout )
  }
}

export default notificationSlice.reducer