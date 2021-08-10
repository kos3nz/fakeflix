import { useState, useEffect } from 'react';

const useViewport = () => {
  // next.jsで'window is not defined.'エラーの対処法
  // このhookで取得したwindow sizeを使ってコンポーネントにダイナミックにclassNameなどを変更する場合は、このhookとは別にnext/dynamicでimportする必要がある

  const isClient = typeof window !== 'undefined';
  const reportWindowSize = () => ({
    width: isClient ? window?.innerWidth : undefined,
    height: isClient ? window?.innerHeight : undefined,
  });

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

export default useViewport;
