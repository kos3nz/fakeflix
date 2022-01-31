import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.user
);

export const selectSession = createSelector(
  [selectUser],
  (user) => user.session
);

export const selectIsProcessing = createSelector(
  [selectUser],
  (user) => user.isProcessing
);

export const selectError = createSelector(
  [selectUser],
  (user) => user.errorMessage
);
