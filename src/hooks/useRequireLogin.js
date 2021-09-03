import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/user/user.selectors';

const useRequireLogin = () => {
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) router.replace('/login');
  }, [currentUser]);

  return currentUser;
};

export default useRequireLogin;
