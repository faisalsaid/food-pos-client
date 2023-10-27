import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.data = !state.data;
    },
  },
});

export const { setToggleMenu } = layoutSlice.actions;
export default layoutSlice.reducer;
