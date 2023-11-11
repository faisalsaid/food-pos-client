import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: localStorage.getItem('sidebarOpen'),
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setToggleMenu } = layoutSlice.actions;
export default layoutSlice.reducer;
