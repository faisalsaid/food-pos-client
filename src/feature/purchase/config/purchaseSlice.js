import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import purchaseServices from './purchaseService';
import { toast } from 'react-toastify';

// handle crete new order
export const createPurchase = createAsyncThunk('menu/createPurchase', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await purchaseServices.purchaseOrder(payload, token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  listPurchase: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // handle create purchase START
      .addCase(createPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listPurchase.push(action.payload);
        toast(`Add order success`);
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
    // handle create purchase END
  },
});

export const {} = purchaseSlice.actions;
export default purchaseSlice.reducer;
