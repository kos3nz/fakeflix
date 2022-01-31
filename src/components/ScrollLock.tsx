import { useEffect } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectIsModalOpen } from 'redux/modal/modal.selectors';
import { selectIsModalVideoOpen } from 'redux/modalVideo/modalVideo.selectors';

export const ScrollLock = () => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const isModalVideoOpen = useAppSelector(selectIsModalVideoOpen);
  const isOpen = isModalOpen || isModalVideoOpen;

  useEffect(() => {
    if (isOpen) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'visible';
  }, [isOpen]);

  return null;
};
