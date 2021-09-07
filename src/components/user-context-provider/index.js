import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from 'db/supabaseClient';
import { setUserSession } from 'redux/user/user.slice';

const UserContextProviderWithRedux = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const session = supabase.auth.session();
    dispatch(setUserSession(session));
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     dispatch(setUserSession(session));
    //   }
    // );
    // return () => {
    //   authListener?.unsubscribe();
    // };
  }, []);

  return null;
};

export default UserContextProviderWithRedux;
