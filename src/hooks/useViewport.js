import { useState, useEffect, useCallback } from 'react';

export const useViewport = () => {
  // next.jsで'window is not defined.'エラーの対処法
  const isClient = typeof window !== 'undefined';
  const reportWindowSize = useCallback(
    () => ({
      width: isClient ? window?.innerWidth : undefined,
      height: isClient ? window?.innerHeight : undefined,
    }),
    [isClient]
  );
  const [viewport, setViewport] = useState(reportWindowSize());

  useEffect(() => {
    const onWindowReSize = () => {
      setViewport((state) => ({
        ...state,
        ...reportWindowSize(),
      }));
    };

    window.addEventListener('resize', onWindowReSize);

    return () => window.removeEventListener('resize', onWindowReSize);
  }, []);

  return viewport;
};
