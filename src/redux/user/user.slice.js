import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: undefined,
  session: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkCurrentSession: (state, action) => {
      state.session = action.payload;
      state.currentUser = action.payload?.user ?? null;
    },
  },
});

export const { checkCurrentSession } = userSlice.actions;

export default userSlice.reducer;
