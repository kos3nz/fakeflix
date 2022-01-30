import { useState, useRef, useEffect } from 'react';

export const useSwiperRef = <El extends HTMLElement>() => {
  const [wrapper, setWrapper] = useState<El>();
  const ref = useRef<El>();

  useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [wrapper, ref];
};
