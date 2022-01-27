import { useState, useEffect, useRef } from 'react';

const emptyFunc = () => {};

const baseOptions = {
  root: null, // set viewport as observable element
  rootMargin: '10px', // callback will be fired when viewport reaches the margin of the element like css. (ex. '20px 0px 0px 0px') *px is needed even when the value is 0.
  threshold: 0, // callback will be fired as soon as viewport reaches the top of the ref element
};

const useIntersectionObserver = (
  options = {},
  callback = emptyFunc,
  onlyOnce = false
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // console.log(entry);
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
        if (entry.isIntersecting && Math.floor(entry.intersectionRatio) === 1) {
          // "If you don't check intersectionRatio ratio === 1, the observed element will trigger the callback twice, because when immediately passing/leaving 100% threshold, observer will trigger isIntersecting = true, intersectionRatio ~= 0.9 (maybe bug). Chrome somehow gets intersectionRatio slightly above 1 on the first box, so floor the value"
          callback(entry);
          if (onlyOnce) observer.unobserve(ref.current);
        }
      },
      { ...baseOptions, ...options }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current, callback]);

  return [ref, isIntersecting, intersectionRatio];
};

export default useIntersectionObserver;
