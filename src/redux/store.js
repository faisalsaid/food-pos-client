import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import layoutSlice from './layout/layout.slice.js';

const rootReducer = combineReducers({ user: userReducer, layout: layoutSlice });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistore = persistStore(store);
