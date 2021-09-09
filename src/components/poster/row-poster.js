import { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Viewport from 'react-responsive';
import PosterBackground from 'components/poster/poster-bg';
import PosterInfo from 'components/poster/poster-info';
import { W780_IMAGE_URL } from 'const/request-url';
import fallbackImage from 'images/Fakeflix_fallback.png';
import { openModal } from 'redux/modal/modal.slice';

const RowPoster = ({ movie, isLarge = false }) => {
  const dispatch = useDispatch();
  const { backdrop_path, poster_path } = movie;
  const aspectRatio = {
    width: isLarge ? 79 : 16,
    height: isLarge ? 120 : 9,
  };
  const imageType = isLarge ? poster_path : backdrop_path;

  const handleOpenModal = (e) => {
    e.stopPropagation();
    dispatch(openModal(movie));
  };

  useEffect(() => {}, []);

  return (
    <div className="row-poster" onClick={handleOpenModal}>
      <Viewport minWidth={640}>
        {(matches) => (
          <Image
            src={imageType ? `${W780_IMAGE_URL}${imageType}` : fallbackImage}
            alt="movie"
            // layout="fill"
            width={aspectRatio.width}
            height={aspectRatio.height}
            layout="responsive"
            quality={matches ? 50 : 30}
            objectFit="cover"
            loading="eager"
          />
        )}
      </Viewport>
      <PosterBackground />
      <PosterInfo movie={movie} />
    </div>
  );
};

export default RowPoster;
