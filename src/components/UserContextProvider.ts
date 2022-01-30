import { useEffect } from 'react';
import { supabase } from 'db/supabaseClient';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUserSession } from 'redux/user/user.slice';
import { selectVia } from 'redux/user/user.selectors';

const UserContextProviderWithRedux = () => {
  const dispatch = useAppDispatch();
  const via = useAppSelector(selectVia);

  useEffect(() => {
    if (via === 'anonymous') return;

    const session = supabase.auth.session();
    dispatch(setUserSession({ session, user: session?.user }));
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
