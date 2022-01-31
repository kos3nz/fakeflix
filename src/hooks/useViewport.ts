import { useState, useLayoutEffect } from 'react';

export const useViewport = () => {
  // next.jsで'window is not defined.'エラーの対処法
  //   const reportWindowSize = () => ({
  //   width: window?.innerWidth || 0,
  //   height: window?.innerHeight || 0,
  // });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const onWindowReSize = () => {
      setViewport((state) => ({
        ...state,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };
    onWindowReSize();
    window.addEventListener('resize', onWindowReSize);
    return () => window.removeEventListener('resize', onWindowReSize);
  }, []);

  return viewport;
};
