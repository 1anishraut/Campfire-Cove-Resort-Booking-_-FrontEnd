// Utils/dateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    checkIn: null,
    checkOut: null,
  },
  reducers: {
    setBookingDates: (state, action) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
  },
});

export const { setBookingDates } = dateSlice.actions;
export default dateSlice.reducer;
