import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from 'db/supabaseClient';
import { setUserSession } from 'redux/user/user.slice';
import { selectVia } from 'redux/user/user.selectors';

const UserContextProviderWithRedux = () => {
  const dispatch = useDispatch();
  const via = useSelector(selectVia);

  useEffect(() => {
    if (via === 'anonymous') return;

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
