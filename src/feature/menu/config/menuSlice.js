import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuServices from './menuServices';

// handle crete new menu
export const createNewMenu = createAsyncThunk('menu/createMenu', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await menuServices.registerMenu(payload, token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all menu
export const fetchAllMenu = createAsyncThunk('menu/fetchAllMenu', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await menuServices.getAllMenu(token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// dell menu by id
export const deleteMenu = createAsyncThunk('menu/delete', async (menuId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await menuServices.deleteMenu(menuId, token);
  } catch (error) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update menu by id
export const updateMenu = createAsyncThunk('menu/update', async (dataMenu, thunkAPI) => {
  // console.log(dataMenu);
  try {
    const token = thunkAPI.getState().user.curentUser.token;
    return await menuServices.updateMenu(dataMenu, token);
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
      // handle add menu
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
        state.message = action.error.message;
      })
      // handle fetch menu
      .addCase(fetchAllMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listMenu = action.payload;
      })
      .addCase(fetchAllMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      // handle delete
      .addCase(deleteMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listMenu = state.listMenu.filter((menu) => menu._id !== action.payload);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      // handle update menu
      .addCase(updateMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listMenu = state.listMenu.map((menu) => (menu._id === action.payload._id ? { ...menu, ...action.payload } : menu));
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        console.log(action);
      });
  },
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
