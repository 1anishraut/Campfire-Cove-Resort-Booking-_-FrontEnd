import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
  name: "meals",
  initialState: null,
  reducers:{
    addMeals:(state, action)=>{
      return action.payload
    },
    removeMeals: (state, action)=>{
      return null
    }
  }
})

export const {addMeals, removeMeals} = mealsSlice.actions

export default mealsSlice.reducer