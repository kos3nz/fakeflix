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
          md relative
          z-10 flex max-w-xl
          flex-col items-center px-[5vw]
          pb-[10vh] lg:items-start
          lg:pb-0
        "
        initial="initial"
        animate="visible"
        variants={wrapperVariants}
      >
        <h1
          className="
          text-center text-3xl font-bold text-paragraph xs:text-4xl sm:text-6xl lg:text-left
            "
        >
          {movieTitle}
        </h1>
        <div
          className="
          mt-6 flex items-center
          space-x-3
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
            mt-4 text-center text-xs
            tracking-wide text-paragraph sm:text-base md:max-w-[60vw] lg:max-w-sm lg:text-left lg:text-sm
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
    relative flex h-9/10
    w-full
    items-end justify-center lg:h-[80vh]
    lg:items-center lg:justify-start
  `}
  >
    <motion.div
      className="w-full max-w-xl animate-pulse px-[5vw] pb-[10vh]"
      initial="initial"
      animate="visible"
      variants={wrapperVariants}
    >
      <div className="space-y-6 py-1">
        <div className="space-y-3">
          <div className="mx-auto h-10 w-3/4 rounded-md bg-gray-400" />
          <div className="mx-auto h-10 w-3/5 rounded-md bg-gray-400" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-10 w-1/4 rounded-md bg-gray-400" />
          <div className="h-10 w-1/4 rounded-md bg-gray-400" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-4 w-full rounded-md bg-gray-400" />
          <div className="h-4 w-5/6 rounded-md bg-gray-400" />
          <div className="h-4 w-3/4 rounded-md bg-gray-400" />
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
