import { LazyLoadImage } from 'react-lazy-load-image-component';
import Viewport from 'react-responsive';
import { PosterInfo } from 'components/PosterInfo';
import {
  type TitleData,
  W500_IMAGE_URL,
  W300_IMAGE_URL,
} from 'constants/request-url';
import { useAppDispatch } from 'redux/hooks';
import { openModal } from 'redux/modal/modal.slice';

type PosterProps = {
  data: TitleData;
  isLarge?: boolean;
};

export const Poster = ({ data, isLarge = false }: PosterProps) => {
  const dispatch = useAppDispatch();
  const { backdrop_path, poster_path } = data;
  const imageType = isLarge ? poster_path : backdrop_path;

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(openModal(data));
  };

  return (
    <div
      className="poster relative rounded-md overflow-hidden cursor-pointer"
      onClick={handleOpenModal}
    >
      <Viewport minWidth={640}>
        {(matches: boolean) => (
          <LazyLoadImage
            src={
              imageType && matches
                ? `${W500_IMAGE_URL}${imageType}`
                : imageType && !matches
                ? `${W300_IMAGE_URL}${imageType}`
                : '/images/fallback.png'
            }
            alt="poster"
          />
        )}
      </Viewport>
      <PosterBackground />
      <PosterInfo data={data} />
    </div>
  );
};

const PosterBackground = () => {
  return (
    <div
      className="
        absolute top-0 left-0
        w-full h-full
        bg-gradient-to-t from-black/50 via-black/30
        transition duration-300
        poster-bg
      "
    />
  );
};
