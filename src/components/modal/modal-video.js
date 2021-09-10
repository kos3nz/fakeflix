import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  selectIsModalVideoOpen,
  selectVideoKey,
} from 'redux/modal-video/modal-video.selectors';
import { closeModalVideo } from 'redux/modal-video/modal-video.slice';
import { useOutsideClick } from 'hooks';

const ModalVideo = () => {
  const dispatch = useDispatch();
  const modalVideoRef = useRef(null);
  const isModalVideoOpen = useSelector(selectIsModalVideoOpen);
  const videoKey = useSelector(selectVideoKey);

  useOutsideClick(modalVideoRef, () => {
    if (isModalVideoOpen) dispatch(closeModalVideo());
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalVideoOpen && (
        <motion.div
          className="modal-video
          fixed top-0 left-0
          w-full min-h-screen
          flex justify-center items-center
          bg-gray-900/80
          z-[100]
          "
          tabIndex="-1"
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
            className="modal-video-inner
              max-w-[90%] sm:max-w-[80%] lg:max-w-3xl w-full
            "
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVideoVariant}
          >
            <div
              className="
            relative
            w-full
            pt-[56.25%]
            overflow-hidden
            "
              // 56.25% = 16:9 Aspect Ratio
            >
              <button
                className="modal-video-close-btn"
                aria-label="Close the modal by clicking here"
              ></button>
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                tabIndex="-1"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalVideo;

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
