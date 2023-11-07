import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/outh/config/user.slice.js';
import layoutReducer from './layout/layout.slice.js';
import menuReducer from '../feature/menu/config/menuSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    menu: menuReducer,
  },
});
