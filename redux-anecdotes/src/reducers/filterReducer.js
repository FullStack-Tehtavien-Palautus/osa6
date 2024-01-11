import { createSlice } from '@reduxjs/toolkit' // Just a commnet

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
  
    filterChange(state, action) {
      return action.payload
    }
  
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer