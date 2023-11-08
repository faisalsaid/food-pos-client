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
      state.listOrder = [...state.listOrder, { item: payload, quantity: 1, orderPrice: payload.price }];
    },
    removeOrderList: (state, { payload }) => {
      state.listOrder.splice(payload, 1);
    },
    addQuantity: (state, { payload }) => {
      state.listOrder[payload].quantity++;
      state.listOrder[payload].orderPrice = state.listOrder[payload].item.price * state.listOrder[payload].quantity;
    },
    bateQuantity: (state, { payload }) => {
      state.listOrder[payload].quantity > 1 && state.listOrder[payload].quantity--;
      state.listOrder[payload].orderPrice = state.listOrder[payload].item.price * state.listOrder[payload].quantity;
    },
    resetListOder: (state) => {
      state.listOrder = [];
    },
  },
});

export const { addOrderList, removeOrderList, addQuantity, bateQuantity, resetListOder } = orderSlice.actions;
export default orderSlice.reducer;
