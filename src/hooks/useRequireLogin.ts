import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentUser } from 'redux/user/user.selectors';

export const useRequireLogin = () => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  useLayoutEffect(() => {
    if (!user) router.push('/play');
  }, [user]);
};
