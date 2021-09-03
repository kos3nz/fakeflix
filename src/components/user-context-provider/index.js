import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from 'db/supabaseClient';
import { checkCurrentSession } from 'redux/user/user.slice';

const UserContextProviderWithRedux = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const session = supabase.auth.session();
    dispatch(checkCurrentSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log({ event }, { session });
        dispatch(checkCurrentSession(session));
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return null;
};

export default UserContextProviderWithRedux;
