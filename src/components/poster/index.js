import { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import PosterBackground from 'components/poster/poster-bg';
import PosterInfo from 'components/poster/poster-info';
import { W780_IMAGE_URL } from 'const/request-url';
import fallbackImage from 'images/Fakeflix_fallback.png';
import { openModal } from 'redux/modal/modal.slice';

const Poster = ({ movie }) => {
  const dispatch = useDispatch();
  const { backdrop_path } = movie;
  const aspectRatio = {
    width: 16,
    height: 9,
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    dispatch(openModal(movie));
  };

  useEffect(() => {}, []);

  return (
    <div
      className="poster relative cursor-pointer rounded-md overflow-hidden"
      onClick={handleOpenModal}
    >
      <Image
        src={
          backdrop_path ? `${W780_IMAGE_URL}${backdrop_path}` : fallbackImage
        }
        alt="movie"
        width={aspectRatio.width}
        height={aspectRatio.height}
        layout="responsive"
        quality={50}
        objectFit="cover"
        // loading="lazy"
      />
      <PosterBackground />
      <PosterInfo movie={movie} />
    </div>
  );
};

export default Poster;
