import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsModalOpen } from 'redux/modal/modal.selectors';
import { selectIsModalVideoOpen } from 'redux/modal-video/modal-video.selectors';

const ScrollLock = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const isModalVideoOpen = useSelector(selectIsModalVideoOpen);
  const isOpen = isModalOpen || isModalVideoOpen;

  useEffect(() => {
    if (isOpen) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'visible';
  }, [isOpen]);

  return null;
};

export default ScrollLock;
