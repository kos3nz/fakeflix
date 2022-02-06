import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { BsFillPlayFill } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from 'components/Button';
import { useOutsideClick, useConvertGenreIds } from 'hooks';
import { type TitleData, W780_IMAGE_URL } from 'constants/request-url';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectIsModalOpen,
  selectModalContent,
} from 'redux/modal/modal.selectors';
import { closeModal } from 'redux/modal/modal.slice';
import { selectIsModalVideoOpen } from 'redux/modalVideo/modalVideo.selectors';
import { openModalVideo } from 'redux/modalVideo/modalVideo.slice';
import { selectFavoritesList } from 'redux/favorites/favorites.selectors';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/favorites/favorites.slice';

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const modalContent = useAppSelector(selectModalContent);
  const isVideoOpen = useAppSelector(selectIsModalVideoOpen);
  const list = useAppSelector(selectFavoritesList);

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
  const isInList = list.some((fav) => fav.id === modalContent?.id);

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

  const handleFavorites = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (modalContent) {
      if (isInList) {
        dispatch(removeFromFavorites(modalContent));
        toast('Removed from your list!');
      } else {
        dispatch(addToFavorites(modalContent));
        toast('Added to your list!');
      }
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && (
        <>
          <motion.div
            className="
            fixed top-0 left-0 z-50
            flex min-h-screen
            w-full items-center justify-center
            overflow-hidden
            bg-black/80
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
              className="scrollbar-hidden h-[85vh] w-[80%] max-w-xl overflow-hidden overflow-y-scroll rounded-md bg-gray-900 outline-none md:w-[65vw] 2xl:max-w-2xl"
              variants={modalVariants}
              tabIndex={-1}
            >
              <div className="relative min-h-[100px] w-full">
                <img
                  src={
                    backdrop_path
                      ? `${W780_IMAGE_URL}${backdrop_path}`
                      : '/images/fallback.png'
                  }
                  alt="poster"
                />
                <div
                  className="
                  absolute bottom-0 left-0
                  h-[50%] w-full
                  bg-gradient-to-t from-gray-900 via-gray-900/30
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
                    ml-1 rounded-full border-1
                    bg-transparent p-2
                    transition
                    duration-300 hover:bg-gray-200
                    hover:text-gray-900 sm:p-3
                    "
                    onClick={handleFavorites}
                  >
                    {isInList ? (
                      <FaMinus className="h-2 w-2 sm:h-3 sm:w-3" />
                    ) : (
                      <FaPlus className="h-2 w-2 sm:h-3 sm:w-3" />
                    )}
                  </button>
                </div>
                <button
                  className="
                    absolute top-4 right-4
                    rounded-full border-1
                    bg-gray-900/75 p-1
                    transition
                    duration-300 hover:bg-gray-200
                    hover:text-gray-900 sm:p-2
                  "
                  onClick={() => dispatch(closeModal())}
                  aria-label="Close the modal by clicking here"
                >
                  <VscChromeClose
                    aria-hidden
                    className="h-4 w-4 sm:h-5 sm:w-5"
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
                  className="mb-4 text-2xl font-semibold sm:text-3xl"
                  variants={infoItemVariants}
                >
                  {movieTitle}
                </motion.h3>
                <motion.p
                  className="text-sm leading-6 xs:text-base"
                  variants={infoItemVariants}
                >
                  {overview}
                </motion.p>
                <hr className="my-4 border-gray-500 xs:my-6" />
                <motion.h4
                  className="mb-4 text-lg xs:text-xl"
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
      className="mb-2 flex text-xs last:mb-0 xs:text-sm"
      variants={infoItemVariants}
    >
      <span className="mr-1 text-gray-500">{`${info}:`}</span>
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
