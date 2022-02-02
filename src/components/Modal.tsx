import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'components/Button';
import { useOutsideClick, useConvertGenreIds } from 'hooks';
import { TitleData, W780_IMAGE_URL } from 'constants/request-url';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectIsModalOpen,
  selectModalContent,
} from 'redux/modal/modal.selectors';
import { closeModal } from 'redux/modal/modal.slice';
import { selectIsModalVideoOpen } from 'redux/modalVideo/modalVideo.selectors';
import { openModalVideo } from 'redux/modalVideo/modalVideo.slice';

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const modalContent = useAppSelector(selectModalContent);
  const isVideoOpen = useAppSelector(selectIsModalVideoOpen);
  const dispatch = useAppDispatch();

  const {
    title,
    original_title,
    name,
    original_name,
    overview,
    genre_ids,
    release_date,
    vote_average,
    original_language,
    ageClassification,
    backdrop_path,
    videoKey,
  } = modalContent || ({} as TitleData);
  const movieTitle = title || name || original_title || original_name;
  const genres = useConvertGenreIds(genre_ids || []);

  useOutsideClick(modalRef, () => {
    if (isVideoOpen) return;
    if (isModalOpen) dispatch(closeModal());
  });

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
    }
  }, [isModalOpen]);

  const handlePlayVideo = () => {
    if (videoKey) dispatch(openModalVideo(videoKey));
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && (
        <>
          <motion.div
            className="
            fixed top-0 left-0 z-50
            w-full min-h-screen
            flex justify-center items-center
            bg-black/80
            overflow-hidden
          "
            // overflow:hiddenでmodalがexit animationで下へ消えることによるスクロールバーを非表示
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bgVariants}
            // tabIndex={-1}
          >
            <motion.div
              ref={modalRef}
              className="w-[90%] sm:w-[80%] md:w-[65vw] max-w-xl 2xl:max-w-2xl h-[90vh] bg-gray-900 rounded-md overflow-hidden overflow-y-scroll scrollbar-hidden outline-none"
              variants={modalVariants}
              tabIndex={-1}
            >
              <div className="w-full h-auto relative">
                <img
                  src={
                    backdrop_path
                      ? `${W780_IMAGE_URL}${backdrop_path}`
                      : '/images/Fakeflix_fallback.png'
                  }
                  alt="poster"
                />
                <div
                  className="
                  absolute bottom-0 left-0
                  w-full h-[50%]
                  bg-gradient-to-t via-gray-900/30 from-gray-900
                "
                />
                <div className="absolute bottom-[5%] left-6 flex items-center space-x-2">
                  <Button
                    Icon={BsFillPlayFill}
                    onClick={handlePlayVideo}
                    color={videoKey ? 'primary' : 'disabled'}
                  >
                    Play
                  </Button>
                  <button
                    className="
                    p-2 sm:p-3 ml-1
                    border-1 rounded-full
                    bg-transparent
                    transition duration-300
                    hover:bg-gray-200 hover:text-gray-900
                    "
                  >
                    <FaPlus className="w-3 sm:w-4 h-3 sm:h-4" aria-hidden />
                  </button>
                </div>
                <button
                  className="
                    absolute top-4 right-4
                    p-1 sm:p-2
                    border-1 rounded-full
                    bg-gray-900/75
                    transition duration-300
                    hover:bg-gray-200 hover:text-gray-900
                  "
                  onClick={() => dispatch(closeModal())}
                  aria-label="Close the modal by clicking here"
                >
                  <VscChromeClose
                    aria-hidden
                    className="w-4 sm:w-5 h-4 sm:h-5"
                  />
                </button>
                <button onFocus={() => modalRef.current?.focus()} />
              </div>
              <motion.div
                className="p-6 sm:p-8"
                initial="hidden"
                animate="visible"
                variants={infoWrapperVariants}
              >
                <motion.h3
                  className="text-2xl sm:text-3xl font-semibold mb-4"
                  variants={infoItemVariants}
                >
                  {movieTitle}
                </motion.h3>
                <motion.p
                  className="text-sm xs:text-base leading-6"
                  variants={infoItemVariants}
                >
                  {overview}
                </motion.p>
                <hr className="my-4 xs:my-6 border-gray-500" />
                <motion.h4
                  className="text-lg xs:text-xl mb-4"
                  variants={infoItemVariants}
                >
                  Info on <b>{movieTitle}</b>
                </motion.h4>
                <InfoItem info="Genres" item={genres?.join(', ')} />
                <InfoItem info="First air date" item={release_date} />
                <InfoItem info="Average vote" item={vote_average} />
                <InfoItem info="Original language" item={original_language} />
                <InfoItem info="Age classification" item={ageClassification} />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

type InfoItemProps = {
  info: string;
  item: string | number | undefined;
};

const InfoItem = ({ info, item = 'Not available' }: InfoItemProps) => {
  return (
    <motion.div
      className="flex text-xs xs:text-sm mb-2 last:mb-0"
      variants={infoItemVariants}
    >
      <span className="text-gray-500 mr-1">{`${info}:`}</span>
      <span>{item}</span>
    </motion.div>
  );
};

const bgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const modalVariants = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 200,
    transition: {
      duration: 0.3,
    },
  },
};
const infoWrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};
const infoItemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};
