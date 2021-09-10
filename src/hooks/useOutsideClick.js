import { useEffect } from 'react';

const useOutsideClick = (ref, cb) => {
  const handleClick = (event) => {
    // if click inside the ref element, do nothing
    if (ref.current?.contains(event.target)) return;
    // if click outside, trigger callback function
    cb(event);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useOutsideClick;
