import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/outh/config/user.slice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import layoutReducer from './layout/layout.slice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
  },
});
// const rootReducer = combineReducers({ user: userReducer, layout: layoutSlice });

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistore = persistStore(store);
