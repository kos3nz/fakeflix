import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectIsModalVideoOpen,
  selectVideoKey,
} from 'redux/modalVideo/modalVideo.selectors';
import { closeModalVideo } from 'redux/modalVideo/modalVideo.slice';
import { useOutsideClick } from 'hooks';

export const ModalVideo = () => {
  const dispatch = useAppDispatch();
  const modalVideoRef = useRef(null);
  const isModalVideoOpen = useAppSelector(selectIsModalVideoOpen);
  const videoKey = useAppSelector(selectVideoKey);

  useOutsideClick(modalVideoRef, () => {
    if (isModalVideoOpen) dispatch(closeModalVideo());
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalVideoOpen && (
        <motion.div
          className="modal-video
          fixed top-0 left-0
          z-[100] flex
          min-h-screen w-full items-center
          justify-center
          bg-gray-900/80
          "
          role="dialog"
          aria-label="You just opened the modal video"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={BgVariant}
        >
          <motion.div
            ref={modalVideoRef}
            // can adjust the size of the video screen here
            className="modal-video-inner w-full max-w-[90%] sm:max-w-[80%] lg:max-w-3xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVideoVariant}
          >
            <div
              className="relative w-full overflow-hidden pt-[56.25%]" // 56.25% = 16:9 Aspect Ratio
            >
              <button
                className="modal-video-close-btn"
                aria-label="Close the modal by clicking here"
              ></button>
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                tabIndex={-1}
                sandbox="allow-scripts allow-same-origin allow-presentation"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BgVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};
const modalVideoVariant = {
  hidden: { opacity: 0, y: '50px' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: '50px',
    transition: {
      duration: 0.5,
    },
  },
};
