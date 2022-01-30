import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  ApiError,
  Session as SupabaseSession,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { supabase } from 'db/supabaseClient';
import type {
  AnonymousData,
  AnonymousSession,
  AnonymousUser,
} from 'pages/api/anonymouslyLogin';

interface UserState {
  user: SupabaseUser | AnonymousUser | null | undefined;
  session: SupabaseSession | AnonymousSession | null | undefined;
  isProcessing: boolean;
  currentRequestId: string | undefined;
  errorMessage: string | undefined;
  via: 'email' | 'anonymous' | undefined;
}

type AuthType = 'signIn' | 'signUp' | 'signOut';

const initialState: UserState = {
  user: undefined,
  session: undefined,
  isProcessing: false,
  currentRequestId: undefined,
  errorMessage: undefined,
  via: undefined,
};

type ViaEmailProps = { email?: string; password?: string; type: AuthType };

export const manageUserSessionWithEmail = createAsyncThunk<
  void,
  ViaEmailProps,
  { rejectValue: ApiError }
>(
  'user/manageUserSessionWithEmail',
  async ({ email, password, type }, { dispatch, rejectWithValue }) => {
    const via = 'email';

    if (type === 'signIn') {
      const { session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) return rejectWithValue(error);
      dispatch(setUserSession({ session, user: session?.user, via }));
    } else if (type === 'signUp') {
      const { session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return rejectWithValue(error);
      dispatch(setUserSession({ session, user: session?.user, via }));
    } else if (type === 'signOut') {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue(error);
      dispatch(setUserSession(null));
    }
  }
);

type AsGuestProps = {
  type: AuthType;
};

export const manageAnonymousSession = createAsyncThunk(
  'user/manageAnonymousSession',
  async ({ type }: AsGuestProps, { dispatch }) => {
    try {
      const via = 'anonymous';

      if (type === 'signIn') {
        const res = await fetch('/api/anonymouslyLogin');
        const { session } = (await res.json()) as AnonymousData;
        dispatch(setUserSession({ session, user: session.user, via }));
      } else {
        dispatch(setUserSession(null));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

type UserSessionPayload = Partial<Pick<UserState, 'session' | 'user' | 'via'>>;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSession: (
      state,
      action: PayloadAction<UserSessionPayload | null>
    ) => {
      state.session = action.payload?.session ?? null;
      state.user = action.payload?.user ?? null;
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
          state.errorMessage = undefined;
        }
      })
      .addCase(manageUserSessionWithEmail.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
        }
        if (action.payload) {
          state.errorMessage = action.payload.message;
        }
      });
  },
});

export const { setUserSession } = userSlice.actions;

export default userSlice.reducer;
