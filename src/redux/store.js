import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/outh/config/user.slice.js';
import layoutReducer from './layout/layout.slice.js';
import menuReducer from '../feature/menu/config/menuSlice.js';
import orderReducer from '../feature/order/config/orderSlice.js';
import purchaseReducer from '../feature/purchase/config/purchaseSlice.js';
import dashboardSlice from '../feature/dashboard/config/dashboardSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    menu: menuReducer,
    order: orderReducer,
    purchase: purchaseReducer,
    dashboard: dashboardSlice,
  },
});
