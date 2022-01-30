import { type MutableRefObject, useEffect } from 'react';

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  cb: (event: MouseEvent) => void
) => {
  const handleClick = (event: MouseEvent) => {
    // if click inside the ref element, do nothing
    if (ref?.current?.contains(event.target as Node)) return;
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
