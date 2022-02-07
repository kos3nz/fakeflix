import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.user
);

export const selectIsProcessing = createSelector(
  [selectUser],
  (user) => user.isProcessing
);

export const selectError = createSelector(
  [selectUser],
  (user) => user.errorMessage
);

export const selectLoginStatus = createSelector(
  [selectUser],
  (user) => user.status
);
