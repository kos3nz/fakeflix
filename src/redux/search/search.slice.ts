import {
  createSlice,
  PayloadAction,
  //  createAsyncThunk
} from '@reduxjs/toolkit';
// import { MOVIE_SEARCH_QUERIES_URL } from 'const/request-url';
// import {
//   fetchResults,
//   attachOfficialTrailerKeysToResults,
//   removeSymbols,
// } from 'utils';

type SearchState = {
  query: string;
};

const initialState: SearchState = {
  query: '',
  // searchResults: [],
  // totalPages: 0,
  // page: 1,
  // error: null,
  // loading: 'idle',
  // currentRequestId: undefined,
};

// export const searchTitles = createAsyncThunk(
//   'search/searchTitles',
//   async (query) => {
//     const filteredQuery = removeSymbols(query);
//     if (filteredQuery.length === 0) return { results: [], totalPages: 0 };

//     try {
//       const { results, totalPages, errorCode } = await fetchResults(
//         `${MOVIE_SEARCH_QUERIES_URL}${filteredQuery}&page=1`
//       );
//       const filteredResults = results.filter((result) => result.backdrop_path);

//       if (errorCode) return { results: [], totalPages: 0 };

//       await attachOfficialTrailerKeysToResults(filteredResults);

//       return { results: filteredResults, totalPages };
//     } catch (error) {
//       throw new Error('Oops, something is wrong!');
//     }
//   }
// );

// export const loadMoreSearchTitles = createAsyncThunk(
//   'search/loadMoreSearchTitles',
//   async (keyword, { getState, requestId }) => {
//     const {
//       search: { page, loading, currentRequestId },
//     } = getState();

//     const filteredQuery = removeSymbols(keyword);

//     if (filteredQuery.length === 0) return [];
//     // return if the same request being called
//     if (loading !== 'pending' || requestId !== currentRequestId) return;

//     try {
//       const { results, errorCode } = await fetchResults(
//         `${MOVIE_SEARCH_QUERIES_URL}${filteredQuery}&page=${page}`
//       );

//       const filteredResults = results.filter((result) => result.backdrop_path);

//       if (errorCode) return [];

//       await attachOfficialTrailerKeysToResults(filteredResults);

//       return filteredResults;
//     } catch (error) {
//       throw new Error('Oops, something is wrong!');
//     }
//   }
// );

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeInputValue: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearInputValue: (state) => {
      state.query = '';
    },
  },
  // extraReducers: (builder) => {
  //   // Search titles
  //   builder
  //     .addCase(searchTitles.fulfilled, (state, action) => {
  //       state.searchResults = [...action.payload.results];
  //       state.totalPages = action.payload.totalPages;
  //       state.page = 2;
  //       state.error = null;
  //     })
  //     .addCase(searchTitles.rejected, (state, action) => {
  //       state.error = action.error;
  //     });

  //   // Load more search titles
  //   builder
  //     .addCase(loadMoreSearchTitles.pending, (state, action) => {
  //       state.loading = 'pending';
  //       state.currentRequestId = action.meta.requestId;
  //     })
  //     .addCase(loadMoreSearchTitles.fulfilled, (state, action) => {
  //       const { requestId } = action.meta;
  //       if (
  //         state.loading === 'pending' &&
  //         state.currentRequestId === requestId
  //       ) {
  //         // state.searchResults = [...state.searchResults, ...action.payload];
  //         // NOTE: ↑ だとsearch results の重複しているものが含まれている場合があるため、Map Objectを利用し除外
  //         // 一度 results をMap Object化、そのあとvalue() methodでvalueだけを新たなarrayに入れる
  //         const results = [...state.searchResults, ...action.payload];
  //         state.searchResults = [
  //           ...new Map(
  //             results.map((result) => [`${result.backdrop_path}`, result]) // [key, value]
  //           ).values(),
  //         ]; // spread syntaxではなく、Array.from()でも可
  //         state.page = state.page + 1;
  //         state.error = null;
  //         state.loading = 'idle';
  //         state.currentRequestId = undefined;
  //       }
  //     })
  //     .addCase(loadMoreSearchTitles.rejected, (state, action) => {
  //       if (
  //         state.loading === 'pending' &&
  //         state.currentRequestId === requestId
  //       ) {
  //         state.error = action.error;
  //         state.loading = 'idle';
  //         state.currentRequestId = undefined;
  //       }
  //     });
  // },
});

export const { changeInputValue, clearInputValue } = searchSlice.actions;

export default searchSlice.reducer;
