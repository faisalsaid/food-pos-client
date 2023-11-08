import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// init state
const initialState = {
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create user slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
