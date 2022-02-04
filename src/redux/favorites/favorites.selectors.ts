import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectFavorites = (state: RootState) => state.favorites;

export const selectFavoritesList = createSelector(
  [selectFavorites],
  (favorites) => favorites.list
);
