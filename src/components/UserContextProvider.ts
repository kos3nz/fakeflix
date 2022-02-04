import { useEffect } from 'react';
import axios from 'axios';
import { supabase } from 'db/supabaseClient';
import { useAppDispatch } from 'redux/hooks';
import { setUserSession } from 'redux/user/user.slice';

const UserContextProviderWithRedux = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const session = supabase.auth.session();

    if (session) {
      dispatch(setUserSession({ session, user: session?.user }));
      axios.post(
        '/api/auth',
        {
          event: 'SIGNED_IN',
          session,
        },
        { withCredentials: true }
      );
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setUserSession({ session, user: session?.user }));
        axios.post(
          '/api/auth',
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

export default UserContextProviderWithRedux;
