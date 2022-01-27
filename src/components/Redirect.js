import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = ({ to = '/' }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
