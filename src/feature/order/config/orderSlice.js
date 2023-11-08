import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// init state
const initialState = {
  listOrder: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create user slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderList: (state, { payload }) => {
      console.log(payload);
      state.listOrder = [...state.listOrder, payload];
    },
  },
});

export const { addOrderList } = orderSlice.actions;
export default orderSlice.reducer;
