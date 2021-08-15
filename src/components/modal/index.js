import Image from 'next/image';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import Button from 'components/button/index';
import { useOutsideClick, useConvertGenreIds } from 'hooks';
import { MOVIE_IMAGE_URL } from 'const/request-url';
import { closeModal } from 'duck/modal/modal.slice';
import { selectModalContent } from 'duck/modal/modal.selectors';

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

const Modal = ({ isOpen }) => {
  const modalContent = useSelector(selectModalContent);
  const dispatch = useDispatch();
  const {
    title,
    overview,
    genre_ids,
    release_date,
    vote_average,
    original_language,
    ageClassification,
    backdrop_path,
  } = modalContent;
  const modalRef = useRef();
  const genres = useConvertGenreIds(genre_ids);

  useOutsideClick(modalRef, () => dispatch(closeModal()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed top-0 left-0 z-50
            w-full h-full
            flex justify-center items-center
            bg-black/80
            overflow-hidden
          "
          // overflow:hiddenでmodalがexit animationで下へ消えることによるスクロールバーを非表示
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bgVariants}
        >
          <motion.div
            ref={modalRef}
            className="w-[90%] sm:w-[80%] md:w-[65vw] h-9/10 bg-gray-900 rounded-md overflow-hidden overflow-y-scroll scrollbar-hidden"
            variants={modalVariants}
          >
            <div className="w-full h-auto relative">
              <Image
                src={`${MOVIE_IMAGE_URL}${backdrop_path}`}
                alt="poster"
                layout="responsive"
                width={16}
                height={9}
                objectFit="cover"
                quality={80}
              />
              <div
                className="
                  absolute bottom-0 left-0
                  w-full h-[50%]
                  bg-gradient-to-t via-gray-900/30 from-gray-900
                "
              />
              <div className="absolute bottom-[5%] left-6 flex items-center gap-2">
                <Button as="a" Icon={BsFillPlayFill}>
                  Play
                </Button>
                <button
                  className="
                  p-2 sm:p-3 ml-1
                  border-1 rounded-full
                  bg-transparent
                  outline-none
                  transition duration-300
                  hover:bg-gray-200 hover:text-gray-900
                  "
                >
                  <FaPlus className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
              </div>
              <button
                className="
                  absolute top-4 right-4
                  p-1 sm:p-2
                  border-1 rounded-full
                  bg-gray-900/75
                  outline-none
                  transition duration-300
                  hover:bg-gray-200 hover:text-gray-900
                "
              >
                <VscChromeClose
                  className="
                  w-4 sm:w-5 h-4 sm:h-5
                  "
                  onClick={() => dispatch(closeModal())}
                />
              </button>
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
                {title}
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
                Info on <b>{title}</b>
              </motion.h4>
              <InfoItem info="Genres" item={genres.join(', ')} />
              <InfoItem info="First air date" item={release_date} />
              <InfoItem info="Average vote" item={vote_average} />
              <InfoItem info="Original language" item={original_language} />
              <InfoItem info="Age classification" item={ageClassification} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoItem = ({ info, item = 'Not available' }) => {
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

export default Modal;
