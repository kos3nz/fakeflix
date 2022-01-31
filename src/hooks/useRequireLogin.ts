import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentUser } from 'redux/user/user.selectors';

export const useRequireLogin = () => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) router.push('/play');
  }, [user]);
};
