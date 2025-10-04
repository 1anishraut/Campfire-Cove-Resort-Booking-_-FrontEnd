import { createSlice } from "@reduxjs/toolkit";


const staySlice = createSlice({
  name: "stay",
  initialState: null,
  reducers:{
    addStay: (state, action)=>{
      return action.payload
    },
    removeStay: (state, action )=>{
      return null
    }
  }
})
export const {addStay, removeStay}= staySlice.actions

export default staySlice.reducer