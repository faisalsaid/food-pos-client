import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  listMenu: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
