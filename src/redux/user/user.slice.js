import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from 'db/supabaseClient';

const initialState = {
  currentUser: undefined,
  session: undefined,
  isProcessing: false,
  currentRequestId: undefined,
  error: undefined,
  via: undefined,
};

export const manageUserSessionWithEmail = createAsyncThunk(
  'user/manageUserSessionWithEmail',
  async ({ email, password, type }, { dispatch }) => {
    const via = 'email';

    if (type === 'signIn') {
      const { session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      dispatch(setUserSession({ session, user: session.user, via }));
    } else if (type === 'signUp') {
      const { session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      dispatch(setUserSession({ session, user: session.user, via }));
    } else if (type === 'signOut') {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      dispatch(setUserSession(null));
    }
  }
);

export const manageAnonymousSession = createAsyncThunk(
  'user/manageAnonymousSession',
  async ({ type }, { dispatch }) => {
    const via = 'anonymous';

    if (type === 'signIn') {
      const res = await fetch('/api/anonymouslyLogin');
      const { session } = await res.json();
      dispatch(setUserSession({ session, user: session.user, via }));
    } else {
      dispatch(setUserSession(null));
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSession: (state, action) => {
      state.session = action.payload?.session ?? null;
      state.currentUser = action.payload?.user ?? null;
      state.via = action.payload?.via ?? undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(manageUserSessionWithEmail.pending, (state, action) => {
        if (!state.isProcessing) {
          state.isProcessing = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(manageUserSessionWithEmail.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
          state.error = undefined;
        }
      })
      .addCase(manageUserSessionWithEmail.rejected, (state, action) => {
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
