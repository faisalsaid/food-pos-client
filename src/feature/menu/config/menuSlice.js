import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuServices from './menuServices';

export const createNewMenu = createAsyncThunk('menu/createMenu', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await menuServices.registerMenu(payload, token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  listMenu: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listMenu.push(action.payload);
      })
      .addCase(createNewMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
