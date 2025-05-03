import { configureStore } from '@reduxjs/toolkit';
import skladReducer from './skladSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    sklad: skladReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
