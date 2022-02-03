import { BsFillPlayFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BannerBackground } from 'components/BannerBackground';
import { Button } from 'components/Button';
import { truncate } from 'utils';
import {
  ORIGINAL_IMAGE_URL,
  W1280_IMAGE_URL,
  W780_IMAGE_URL,
  type TitleData,
} from 'constants/request-url';
import { useAppDispatch } from 'redux/hooks';
import { openModal } from 'redux/modal/modal.slice';
import { openModalVideo } from 'redux/modalVideo/modalVideo.slice';
import { useViewport } from 'hooks';

type BannerProps = {
  data: TitleData;
};

export const Banner = ({ data }: BannerProps) => {
  const dispatch = useAppDispatch();
  const { width } = useViewport();
  const {
    backdrop_path,
    poster_path,
    title,
    original_title,
    name,
    original_name,
    overview,
    videoKey,
  } = data;
  const movieTitle = title || name || original_title || original_name;
  const description = truncate(overview, 150);
  const imageSize =
    width > 1024 // wider than 1280px, provide original image
      ? ORIGINAL_IMAGE_URL
      : width > 640 // wider than 768px, provide w1280 image
      ? W1280_IMAGE_URL
      : W780_IMAGE_URL; // otherwise, provide w780 image
  const imageType = width > 768 ? backdrop_path : poster_path;

  const handlePlayVideo = () => {
    if (videoKey) dispatch(openModalVideo(videoKey));
  };

  return (
    <BannerBackground imageUrl={`${imageSize}${imageType}`}>
      <motion.div
        className="
          relative z-10
          max-w-xl pb-[10vh] px-[5vw]
          flex flex-col items-center
          lg:items-start lg:pb-0
          md
        "
        initial="initial"
        animate="visible"
        variants={wrapperVariants}
      >
        <h1
          className="
          text-paragraph text-3xl xs:text-4xl sm:text-6xl font-bold text-center lg:text-left
            "
        >
          {movieTitle}
        </h1>
        <div
          className="
          flex items-center space-x-3
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
              dispatch(openModal(data));
            }}
          >
            More info
          </Button>
        </div>
        <p
          className="
            md:max-w-[60vw] lg:max-w-sm mt-4
            text-xs sm:text-base lg:text-sm text-paragraph text-center lg:text-left tracking-wide
            "
        >
          {description}
        </p>
      </motion.div>
    </BannerBackground>
  );
};

export const BannerFallback = () => (
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
