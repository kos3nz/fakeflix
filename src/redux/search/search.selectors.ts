import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectSearch = (state: RootState) => state.search;

export const selectSearchQuery = createSelector(
  [selectSearch],
  (search) => search.query
);

// export const selectSearchResults = createSelector(
//   [selectSearch],
//   (search) => search.searchResults
// );

// export const selectTotalPages = createSelector(
//   [selectSearch],
//   (search) => search.totalPages
// );

// export const selectSearchPage = createSelector(
//   [selectSearch],
//   (search) => search.page
// );

// export const selectSearchError = createSelector(
//   [selectSearch],
//   (search) => search.error
// );
