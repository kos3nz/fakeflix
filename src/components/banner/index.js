import { useDispatch } from 'react-redux';
import { BsFillPlayFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import MovieBG from 'components/movie-background';
import Button from 'components/button';
import { truncate } from 'utils';
import { ORIGINAL_IMAGE_URL } from 'const/request-url';
import { openModal } from 'redux/modal/modal.slice';
import { openModalVideo } from 'redux/modal-video/modal-video.slice';

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
  const dispatch = useDispatch();
  const {
    backdrop_path,
    title,
    original_title,
    name,
    original_name,
    overview,
    videoKey,
  } = movie;
  const movieTitle = title || name || original_title || original_name;
  const description = truncate(overview, 150);

  const handlePlayVideo = () => {
    if (videoKey) dispatch(openModalVideo(videoKey));
  };

  return (
    <>
      <MovieBG imageUrl={`${ORIGINAL_IMAGE_URL}${backdrop_path}`}>
        <motion.div
          className="
                relative z-10
                max-w-xl pb-[10vh] px-[4vw]
                flex flex-col items-center
                lg:items-start lg:pb-0
              "
          initial="initial"
          animate="visible"
          variants={wrapperVariants}
        >
          <h1
            className="
          text-paragraph text-4xl xs:text-5xl sm:text-6xl font-bold text-center lg:text-left
            "
          >
            {movieTitle}
          </h1>
          <div
            className="
            flex items-center gap-3
            mt-6
            "
          >
            <Button
              Icon={BsFillPlayFill}
              onClick={handlePlayVideo}
              color={videoKey ? 'primary' : 'disabled'}
            >
              Play
            </Button>
            <Button
              color="gray"
              Icon={AiOutlineInfoCircle}
              onClick={() => {
                dispatch(openModal(movie));
              }}
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
    </>
  );
};

const BannerFallback = () => (
  <div
    className={`
    w-full h-9/10 lg:h-[80vh]
    relative
    flex items-end justify-center
    lg:items-center lg:justify-start
  `}
  >
    <motion.div
      className="pb-[10vh] px-[5vw] max-w-xl w-full animate-pulse"
      initial="initial"
      animate="visible"
      variants={wrapperVariants}
    >
      <div className="space-y-6 py-1">
        <div className="space-y-3">
          <div className="h-10 bg-gray-400 rounded-md w-3/4 mx-auto" />
          <div className="h-10 bg-gray-400 rounded-md w-3/5 mx-auto" />
        </div>
        <div className="space-x-2 flex items-center justify-center">
          <div className="h-10 bg-gray-400 rounded-md w-1/4" />
          <div className="h-10 bg-gray-400 rounded-md w-1/4" />
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div className="h-4 bg-gray-400 rounded-md w-full" />
          <div className="h-4 bg-gray-400 rounded-md w-5/6" />
          <div className="h-4 bg-gray-400 rounded-md w-3/4" />
        </div>
      </div>
    </motion.div>
  </div>
);

const BannerContainer = ({ movie }) =>
  movie ? <Banner movie={movie} /> : <BannerFallback />;

export default BannerContainer;
