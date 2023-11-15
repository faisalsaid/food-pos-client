import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from './dashboardService';

// Get all menu
export const fetchAllMenu = createAsyncThunk('menu/fetchDashboardData', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await dashboardService.getAllMenu(token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.getDashboardData(message);
  }
});

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
    builder
      // handle fetch dashboard data
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
