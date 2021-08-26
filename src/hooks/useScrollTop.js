import { useState, useEffect } from 'react';

const useScrollTop = (position) => {
  const [isScrollTop, setIsScrollTop] = useState(true);

  const getScrollTop = () => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };

  useEffect(() => {
    const onScroll = () => {
      const positionTop = getScrollTop();
      if (positionTop > position) setIsScrollTop(false);
      else setIsScrollTop(true);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return isScrollTop;
};

export default useScrollTop;
