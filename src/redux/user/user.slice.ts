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
import axios, { AxiosResponse } from 'axios';

interface UserState {
  user: SupabaseUser | null | undefined;
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
  async ({ email, password, type }, { dispatch, rejectWithValue }) => {
    if (type === 'SIGN_IN') {
      try {
        const { data }: AxiosResponse<{ session: SupabaseSession }> =
          await axios({
            method: 'POST',
            url: '/api/auth/signIn',
            data: {
              email,
              password,
            },
            withCredentials: true,
          });
        axios.post(
          '/api/auth/setCookie',
          {
            event: 'SIGNED_IN',
            session: data.session,
          },
          { withCredentials: true }
        );
        dispatch(setUser(data.session.user));
      } catch (error) {
        return rejectWithValue(error as ApiError);
      }
    } else if (type === 'SIGN_UP') {
      try {
        const { data }: AxiosResponse<{ session: SupabaseSession }> =
          await axios({
            method: 'POST',
            url: '/api/auth/signUp',
            data: {
              email,
              password,
            },
            withCredentials: true,
          });
        axios.post(
          '/api/auth/setCookie',
          {
            event: 'SIGNED_IN',
            session: data.session,
          },
          { withCredentials: true }
        );
        dispatch(setUser(data.session.user));
      } catch (error) {
        return rejectWithValue(error as ApiError);
      }
    } else if (type === 'SIGN_OUT') {
      axios.post(
        '/api/auth/setCookie',
        {
          event: 'SIGNED_OUT',
          session: null,
        },
        { withCredentials: true }
      );
      dispatch(setUser(null));
    }
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
