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
import { ElementType } from 'react';

type PosterProps = {
  as?: ElementType;
  data: TitleData;
  isLarge?: boolean;
};

export const Poster = ({ as = 'div', data, isLarge = false }: PosterProps) => {
  const Component = as;

  const dispatch = useAppDispatch();
  const { backdrop_path, poster_path } = data;
  const imageType = isLarge ? poster_path : backdrop_path;

  const handleOpenModal = () => {
    dispatch(openModal(data));
  };

  return (
    <Component
      className="poster relative cursor-pointer overflow-hidden rounded-md"
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
    </Component>
  );
};

const PosterBackground = () => {
  return (
    <div
      className="
        poster-bg absolute top-0
        left-0 h-full
        w-full bg-gradient-to-t from-black/50
        via-black/30 transition
        duration-300
      "
    />
  );
};
