import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectIsModalVideoOpen,
  selectVideoKey,
} from 'redux/modalVideo/modalVideo.selectors';
import { closeModalVideo } from 'redux/modalVideo/modalVideo.slice';
import { useOutsideClick } from 'hooks';
import { VscChromeClose } from 'react-icons/vsc';

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
        <FocusLock>
          <motion.div
            className="
            fixed top-0 left-0
            z-[100] flex
            min-h-screen w-full items-center
            justify-center
            bg-gray-900/80
            "
            aria-label="You just opened the modal video"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={BgVariant}
          >
            <motion.div
              ref={modalVideoRef}
              // can adjust the size of the video screen here
              className="w-full max-w-[90%] bg-red-50 sm:max-w-[80%] lg:max-w-4xl xl:max-w-5xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVideoVariant}
              role="dialog"
            >
              <div
                className="relative w-full overflow-hidden pt-[56.25%]" // 56.25% = 16:9 Aspect Ratio
              >
                <iframe
                  className="absolute top-0 left-0 bottom-0 right-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>
              </div>
            </motion.div>
            <button
              className="
                absolute top-4 right-4
                rounded-full border-1
                bg-gray-900/75 p-1
                transition
                duration-300 hover:bg-gray-200
                hover:text-gray-900 sm:p-2
              "
              onClick={() => dispatch(closeModalVideo())}
              aria-label="Close the modal by clicking here"
            >
              <VscChromeClose className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </button>
          </motion.div>
        </FocusLock>
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
