import { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import MovieBG from 'components/movie-background';
import Button from 'components/button';
import Modal from 'components/modal';
import { truncate } from 'utils';

const wrapperVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Banner = ({ movie }) => {
  const [isVisible, setIsVisible] = useState(false);
  const description = truncate(movie.description, 150);

  return (
    <>
      <MovieBG imageUrl={movie.imageUrl}>
        <motion.div
          className="
          relative z-10
          pb-[10vh] px-[4vw]
          flex flex-col items-center
          lg:items-start lg:pb-0
        "
          initial="initial"
          animate="visible"
          variants={wrapperVariants}
        >
          <h1
            className="
          text-paragraph text-4xl xs:text-5xl sm:text-6xl font-bold
          "
          >
            {movie.title}
          </h1>
          <div
            className="
            flex items-center gap-3
            mt-6
          "
          >
            <Button as="a" Icon={BsFillPlayFill}>
              Play
            </Button>
            <Button
              color="gray"
              Icon={AiOutlineInfoCircle}
              onClick={() => setIsVisible(true)}
            >
              More info
            </Button>
          </div>
          <p
            className="
            md:max-w-[60vw] lg:max-w-sm mt-4
            text-sm sm:text-base lg:text-sm text-paragraph text-center lg:text-left tracking-wide
          "
          >
            {description}
          </p>
        </motion.div>
      </MovieBG>
      <Modal movie={movie} isVisible={isVisible} cb={setIsVisible} />
    </>
  );
};

export default Banner;
