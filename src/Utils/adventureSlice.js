import { createSlice } from "@reduxjs/toolkit";

const adventureSlice = createSlice({
  name: "adventure",
  initialState: null,
  reducers:{
    addAdventure: (state, action)=>{
      return action.payload
    },
    removeAdventure: (state, action)=>{
      return null
    }
  }
})

export const {addAdventure, removeAdventure} = adventureSlice.actions

export default adventureSlice.reducer