import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

export const selectSearchResults = createSelector(
  [selectSearch],
  (search) => search.searchResults
);

export const selectTotalPages = createSelector(
  [selectSearch],
  (search) => search.totalPages
);

export const selectSearchQuery = createSelector(
  [selectSearch],
  (search) => search.query
);

export const selectSearchPage = createSelector(
  [selectSearch],
  (search) => search.page
);

export const selectSearchError = createSelector(
  [selectSearch],
  (search) => search.error
);

export const selectSearchIsVisible = createSelector(
  [selectSearch],
  (search) => search.isVisible
);
