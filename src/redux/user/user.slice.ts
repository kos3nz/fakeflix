import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { ApiError, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from 'db/supabaseClient';

interface UserState {
  user: SupabaseUser | null | undefined;
  isProcessing: boolean;
  currentRequestId: string | undefined;
  errorMessage: string | undefined;
  status: LoginStatus | undefined;
}

type LoginStatus = {
  type: AuthType | undefined;
  status: 'success' | 'failed' | undefined;
};

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
  isProcessing: false,
  currentRequestId: undefined,
  errorMessage: undefined,
  status: undefined,
};

type ViaEmailProps = {
  email?: string;
  password?: string;
  type: AuthType;
};

export const manageUserSessionWithSupabase = createAsyncThunk<
  LoginStatus,
  ViaEmailProps,
  { rejectValue: { type: AuthType; error: ApiError } }
>(
  'user/manageUserSessionWithSupabase',
  async ({ email, password, type }, { rejectWithValue }) => {
    if (type === 'SIGN_IN') {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) return rejectWithValue({ type, error });
    } else if (type === 'SIGN_UP') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return rejectWithValue({ type, error });
    } else if (type === 'SIGN_OUT') {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue({ type, error });
    }
    return { type, status: 'success' };
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SupabaseUser | null>) => {
      state.user = action.payload ?? null;
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
          state.status = { ...action.payload };
        }
      })
      .addCase(manageUserSessionWithSupabase.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.isProcessing && state.currentRequestId === requestId) {
          state.isProcessing = false;
          state.currentRequestId = undefined;
          state.errorMessage = action?.payload?.error.message;
          state.status = { type: action?.payload?.type, status: 'failed' };
        }
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
