import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectSession = createSelector(
  [selectUser],
  (user) => user.session
);

export const selectIsProcessing = createSelector(
  [selectUser],
  (user) => user.isProcessing
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectVia = createSelector([selectUser], (user) => user.via);
