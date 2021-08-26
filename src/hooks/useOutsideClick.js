import { useEffect } from 'react';

const useOutsideClick = (ref, cb) => {
  const handleClick = (e) => {
    // if click inside the ref element, do nothing
    if (ref.current?.contains(e.target)) return;
    // if click outside, trigger callback function
    cb();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useOutsideClick;
