import toast from 'react-hot-toast';
import { FiChevronDown } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useConvertGenreIds } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openModal } from 'redux/modal/modal.slice';
import { openModalVideo } from 'redux/modalVideo/modalVideo.slice';
import { TitleData } from 'constants/request-url';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/favorites/favorites.slice';
import { selectFavoritesList } from 'redux/favorites/favorites.selectors';

export const PosterInfo = ({ data }: { data: TitleData }) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectFavoritesList);
  const { title, original_title, name, original_name, genre_ids, videoKey } =
    data;
  const movieTitle = title || name || original_title || original_name;
  const genres = useConvertGenreIds(genre_ids);
  const isInList = list.some((fav) => fav.id === data.id);

  const handleOpenModal = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(openModal(data));
  };

  const handleFavorites = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isInList) {
      dispatch(removeFromFavorites(data));
      toast('Removed from your list!');
    } else {
      dispatch(addToFavorites(data));
      toast('Added to your list!');
    }
  };

  const handlePlay = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (videoKey) dispatch(openModalVideo(videoKey));
  };

  return (
    <div
      className="
        absolute top-0 left-0
        w-full h-full
        p-2
        hidden lg:flex flex-col justify-end items-start
        transform
        transition duration-500 delay-150
        poster-info
      "
    >
      <div className="flex items-center space-x-1">
        <span
          className={`
              border-1 rounded-full
              transition duration-300
              p-1
              ${
                videoKey
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-400 hover:border-gray-400'
                  : 'bg-gray-500 text-gray-700 border-gray-500 cursor-default'
              }
            `}
          onClick={handlePlay}
          aria-label="Play"
        >
          <BsFillPlayFill className="w-4 sm:w-5 h-4 sm:h-5" />
        </span>
        <span
          className="
              p-2 ml-1
              border-1 rounded-full
              bg-transparent
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
            "
          onClick={handleFavorites}
          aria-label="Add favorite"
        >
          {isInList ? (
            <FaMinus className="w-2 sm:w-3 h-2 sm:h-3" />
          ) : (
            <FaPlus className="w-2 sm:w-3 h-2 sm:h-3" />
          )}
        </span>
        <span
          className="
              p-1 ml-1
              border-1 rounded-full
              bg-transparent
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
            "
          onClick={handleOpenModal}
          aria-label="More Info"
        >
          <FiChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
        </span>
      </div>
      <h3 className="text-xs xl:text-sm font-medium mt-2 text-left">
        {movieTitle}
      </h3>
      <div className="flex items-center mt-1 space-x-1">
        {genres.map((genre, i) => (
          <span key={i} className="poster-genre flex items-center text-[8px]">
            {genre}
            <span className="block w-[5px] h-[5px] bg-gray-400 rounded-full ml-1" />
          </span>
        ))}
      </div>
    </div>
  );
};
