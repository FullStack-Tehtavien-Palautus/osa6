import { createSlice } from '@reduxjs/toolkit' // Just a commnet

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome!',
  reducers: {
  
    notificationDrape(state, action) {
      return action.payload
    }
  
  }
})

export const { notificationDrape } = notificationSlice.actions
export default notificationSlice.reducer