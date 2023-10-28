import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURI } from '../../config/environtment';

// Fetch user data {afterl login}
export const fetchCurrentUser = createAsyncThunk('user/fetchUser', (data) => {
  // const payload = { _id: data._id };
  console.log('user/fetchUser', data);

  return axios.get(`${apiURI}/user/me`).then((resp) => resp.data);
});

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
    logOut: (state) => {
      state.curentUser.isloading = false;
      state.curentUser.data = [];
      state.curentUser.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.curentUser.isloading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      (state.curentUser.isloading = false), (state.curentUser.data = payload);
      state.curentUser.error = '';
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      (state.curentUser.isloading = false), (state.curentUser.data = []), (state.curentUser.error = action.error);
    });
  },
});

export const { signInStart, signInFailure, signInSuccess, logOut } = userSlice.actions;
export default userSlice.reducer;
