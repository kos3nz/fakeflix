import { configureStore } from '@reduxjs/toolkit';
import modalReducer from 'duck/modal/modal.slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
