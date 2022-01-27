import { useState, useLayoutEffect } from 'react';

const useViewport = () => {
  // next.jsで'window is not defined.'エラーの対処法
  const reportWindowSize = () => ({
    width: window?.innerWidth || undefined,
    height: window?.innerHeight || undefined,
  });
  const [viewport, setViewport] = useState(reportWindowSize());

  useLayoutEffect(() => {
    const onWindowReSize = () => {
      setViewport((state) => ({
        ...state,
        ...reportWindowSize(),
      }));
    };
    onWindowReSize();
    window.addEventListener('resize', onWindowReSize);
    return () => window.removeEventListener('resize', onWindowReSize);
  }, []);

  return viewport;
};

export default useViewport;
