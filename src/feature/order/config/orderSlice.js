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
      state.listOrder = [...state.listOrder, payload];
    },
    removeOrderList: (state, { payload }) => {
      state.listOrder.splice(payload, 1);
    },
  },
});

export const { addOrderList, removeOrderList } = orderSlice.actions;
export default orderSlice.reducer;
