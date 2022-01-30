import { useRouter } from 'next/router';

export const useUrlQueryVariable = (key: string) => {
  const { asPath } = useRouter();

  const variable = asPath.split('?')[1];
  const pair = variable.split('=');
  const queryKey = decodeURIComponent(pair[0]);
  const queryValue = decodeURIComponent(pair[1].split('+').join(' '));

  if (queryKey === key) return queryValue;

  return null;
};
