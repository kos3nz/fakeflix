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

interface UserState {
  user: SupabaseUser | null | undefined;
  session: SupabaseSession | null | undefined;
  isProcessing: boolean;
  currentRequestId: string | undefined;
  errorMessage: string | undefined;
}

type AuthType =
  | typeof authType.SIGN_IN
  | typeof authType.SIGN_UP
  | typeof authType.SIGN_OUT;

export const authType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
} as const;

const initialState: UserState = {
  user: undefined,
  session: undefined,
  isProcessing: false,
  currentRequestId: undefined,
  errorMessage: undefined,
};

type ViaEmailProps = {
  email?: string;
  password?: string;
  type: AuthType;
};

export const manageUserSessionWithSupabase = createAsyncThunk<
  void,
  ViaEmailProps,
  { rejectValue: ApiError }
>(
  'user/manageUserSessionWithSupabase',
  async ({ email, password, type }, { rejectWithValue }) => {
    if (type === 'SIGN_IN') {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) return rejectWithValue(error);
    } else if (type === 'SIGN_UP') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return rejectWithValue(error);
    } else if (type === 'SIGN_OUT') {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue(error);
    }
  }
);

type UserSessionPayload = Partial<Pick<UserState, 'session' | 'user'>>;

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(manageUserSessionWithSupabase.pending, (state, action) => {
        if (!state.isProcessing) {
          state.isProcessing = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(manageUserSessionWithSupabase.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
          state.errorMessage = undefined;
        }
      })
      .addCase(manageUserSessionWithSupabase.rejected, (state, action) => {
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
