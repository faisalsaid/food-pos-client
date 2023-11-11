import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices.js';

// Get User from localSotarage
const user = JSON.parse(localStorage.getItem('user'));

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authServices.registerUser(user);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// User Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authServices.login(user);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// signWithGoogle
export const signWithGoogle = createAsyncThunk('auth/GoogleSign', async (user, thunkAPI) => {
  try {
    return await authServices.googleOAuth(user);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// init state
const initialState = {
  curentUser: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    logOut: (state) => {
      localStorage.removeItem('user');
      state.curentUser = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.curentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.curentUser = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.curentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.curentUser = null;
      })
      .addCase(signWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.curentUser = action.payload;
      })
      .addCase(signWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.curentUser = null;
      });
  },
});

export const { signInStart, signInFailure, signInSuccess, reset, logOut } = userSlice.actions;
export default userSlice.reducer;
