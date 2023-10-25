import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  curentUser: { isloading: false, data: [], error: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.curentUser.isloading = true;
    },
    signInSuccess: (state, action) => {
      state.curentUser.isloading = false;
      state.curentUser.data = action.payload;
      state.curentUser.error = '';
    },
    signInFailure: (state, action) => {
      console.log(action.payload);
      state.curentUser.isloading = false;
      state.curentUser.data = [];
      state.curentUser.error = action.payload;
    },
  },
});

export const { signInStart, signInFailure, signInSuccess } = userSlice.actions;
export default userSlice.reducer;
