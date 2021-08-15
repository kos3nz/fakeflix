import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { FiChevronDown } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { MOVIE_IMAGE_URL } from 'const/request-url';
import { useConvertGenreIds } from 'hooks';
import fallbackImage from 'images/Fakeflix_fallback.png';
import { openModal } from 'duck/modal/modal.slice';

const RowPoster = ({ movie, isLarge = false, ...rest }) => {
  const dispatch = useDispatch();
  const {
    title,
    original_title,
    name,
    original_name,
    backdrop_path,
    poster_path,
    genre_ids,
  } = movie;
  const genres = useConvertGenreIds(genre_ids);
  const aspectRatio = {
    width: isLarge ? 79 : 16,
    height: isLarge ? 120 : 9,
  };
  const imageType = isLarge ? poster_path : backdrop_path;
  const movieTitle = title || name || original_title || original_name;

  const handleOpenModal = (e) => {
    e.stopPropagation();
    dispatch(openModal(movie));
  };

  const handleAddFavorite = (e) => {
    e.stopPropagation();
  };

  const handlePlay = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="row-poster" onClick={handleOpenModal} {...rest}>
      <Image
        src={imageType ? `${MOVIE_IMAGE_URL}${imageType}` : fallbackImage}
        alt="movie"
        // layout="fill"
        width={aspectRatio.width}
        height={aspectRatio.height}
        layout="responsive"
        quality={80}
        objectFit="cover"
      />
      <div
        className="
          absolute top-0 left-0
          w-full h-full
          bg-gradient-to-t from-black/50 via-black/40
          transition duration-500
          poster-bg
        "
      />
      <div
        className="
        absolute top-0 left-0
        w-full h-full
        p-2
        flex flex-col justify-end items-start
        transform
        transition duration-500 delay-150
        poster-info
        "
      >
        <div className="flex items-center gap-1">
          <button
            className="
              p-1
              border-1 rounded-full
              text-gray-900
              bg-gray-200
              outline-none
              transition duration-300
              hover:bg-gray-400 hover:border-gray-400
            "
            onClick={handlePlay}
          >
            <BsFillPlayFill
              className="
              w-4 sm:w-5 h-4 sm:h-5
              "
            />
          </button>
          <button
            className="
              p-2 ml-1
              border-1 rounded-full
              bg-transparent
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
              "
            onClick={handleAddFavorite}
          >
            <FaPlus className="w-2 sm:w-3 h-2 sm:h-3" />
          </button>
          <button
            className="
              p-1 ml-1
              border-1 rounded-full
              bg-transparent
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
              "
            onClick={handleOpenModal}
          >
            <FiChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
        <h3 className="text-sm font-medium mt-2">{movieTitle}</h3>
        <div className="flex items-center mt-1 space-x-1">
          {genres.map((genre, i) => (
            <span key={i} className="poster-genre flex items-center text-[8px]">
              {genre}
              <span className="block w-[5px] h-[5px] bg-gray-400 rounded-full ml-1" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RowPoster;
