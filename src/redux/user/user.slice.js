import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from 'db/supabaseClient';

const initialState = {
  currentUser: undefined,
  session: undefined,
  isProcessing: false,
  currentRequestId: undefined,
  error: undefined,
};

export const manageUserSession = createAsyncThunk(
  'user/manageUserSession',
  async ({ email, password, type }, { dispatch }) => {
    if (type === 'signIn') {
      const { session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      dispatch(setUserSession(session));
    } else if (type === 'signUp') {
      const { session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      dispatch(setUserSession(session));
    } else if (type === 'signOut') {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      dispatch(setUserSession(null));
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSession: (state, action) => {
      state.session = action.payload;
      state.currentUser = action.payload?.user ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(manageUserSession.pending, (state, action) => {
        if (!state.isProcessing) {
          state.isProcessing = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(manageUserSession.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
          state.error = undefined;
        }
      })
      .addCase(manageUserSession.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      });
  },
});

export const { setUserSession } = userSlice.actions;

export default userSlice.reducer;
