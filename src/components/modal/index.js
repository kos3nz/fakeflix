import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import MovieBG from 'components/movie-background';
import Button from 'components/button/index';
import { useOutsideClick } from 'hooks';

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

const Modal = ({
  movie: {
    title,
    description,
    genres,
    firstAirDate,
    averageVote,
    language,
    ageClassification,
    imageUrl,
  },
  isVisible,
  cb,
}) => {
  const modalRef = useRef();
  useOutsideClick(modalRef, () => cb(false));

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.div
          className="
        absolute top-0 left-0 z-50
        w-full h-screen
        flex justify-center items-center
        bg-black/75
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
            className="w-[90%] sm:w-[80%] md:w-[60%] h-9/10 bg-gray-900 rounded-md overflow-hidden overflow-y-scroll scrollbar-hidden"
            variants={modalVariants}
          >
            <MovieBG type="modal" imageUrl={imageUrl}>
              <div className="absolute bottom-[10%] left-6 flex items-center gap-2">
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
                  onClick={() => cb(false)}
                />
              </button>
            </MovieBG>
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
                {description}
              </motion.p>
              <hr className="my-4 xs:my-6 text-gray-600 " />
              <motion.h4
                className="text-lg xs:text-xl mb-4"
                variants={infoItemVariants}
              >
                Info on <b>{title}</b>
              </motion.h4>
              <InfoItem info="Genres" item={genres} />
              <InfoItem info="First air date" item={firstAirDate} />
              <InfoItem info="Average vote" item={averageVote} />
              <InfoItem info="Original language" item={language} />
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
      className="flex text-sm xs:text-base mb-2 last:mb-0"
      variants={infoItemVariants}
    >
      <span className="text-gray-500 mr-1">{`${info}:`}</span>
      <span>{item}</span>
    </motion.div>
  );
};

export default Modal;
