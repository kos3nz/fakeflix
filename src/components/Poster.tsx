import Image from 'next/image';
import Viewport from 'react-responsive';
import { PosterInfo } from 'components/PosterInfo';
import { type TitleData, W780_IMAGE_URL } from 'constants/request-url';
import fallbackImage from 'images/Fakeflix_fallback.png';
import { useAppDispatch } from 'redux/hooks';
import { openModal } from 'redux/modal/modal.slice';

type PosterProps = {
  data: TitleData;
  isLarge?: boolean;
};

export const Poster = ({ data, isLarge = false }: PosterProps) => {
  const dispatch = useAppDispatch();
  const { backdrop_path, poster_path } = data;
  const aspectRatio = {
    width: isLarge ? 79 : 16,
    height: isLarge ? 120 : 9,
  };
  const imageType = isLarge ? poster_path : backdrop_path;

  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(openModal(data));
  };

  return (
    <button
      className="poster relative rounded-md overflow-hidden cursor-pointer"
      onClick={handleOpenModal}
    >
      <Viewport minWidth={640}>
        {(matches: boolean) => (
          <Image
            src={imageType ? `${W780_IMAGE_URL}${imageType}` : fallbackImage}
            alt="movie"
            width={aspectRatio.width}
            height={aspectRatio.height}
            layout="responsive"
            quality={matches ? 40 : 20}
            objectFit="cover"
            priority
          />
        )}
      </Viewport>
      <PosterBackground />
      <PosterInfo data={data} />
    </button>
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
