import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  dashboardData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
