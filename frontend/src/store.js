import { configureStore } from '@reduxjs/toolkit';
import FormReducer from './reducer';

export const store = configureStore({
  reducer: {
    form: FormReducer,
  },
});