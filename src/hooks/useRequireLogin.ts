import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentUser } from 'redux/user/user.selectors';

export const useRequireLogin = () => {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) router.push('/play');
  }, [currentUser]);

  return currentUser;
};
