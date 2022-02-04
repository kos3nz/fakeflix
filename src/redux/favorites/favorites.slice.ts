import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TitleData } from 'constants/request-url';

type FavoriteState = { list: TitleData[] };

const initialState: FavoriteState = {
  list: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<TitleData>) => {
      state.list.unshift(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<TitleData>) => {
      state.list = state.list.filter((data) => {
        return data.id !== action.payload.id;
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
