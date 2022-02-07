import { useEffect } from 'react';
import axios from 'axios';
import { supabase } from 'db/supabaseClient';
import { useAppDispatch } from 'redux/hooks';
import { setUser } from 'redux/user/user.slice';

export const AuthUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = supabase.auth.user();

    if (user) {
      dispatch(setUser(user));
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setUser(session?.user || null));
        axios.post(
          '/api/auth/setCookie',
          {
            event,
            session,
          },
          { withCredentials: true }
        );
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return null;
};
