// dateRangeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    startDate: new Date(),
    endDate: new Date()
  },
  reducers: {
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    }
  }
});

export const { setDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;