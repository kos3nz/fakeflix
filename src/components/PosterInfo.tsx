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
        poster-info absolute top-0
        left-0 hidden
        h-full
        w-full transform flex-col items-start justify-end
        p-2
        transition delay-150 duration-500
        lg:flex
      "
    >
      <div className="flex items-center space-x-1">
        <span
          className={`
              rounded-full border-1
              p-1 transition
              duration-300
              ${
                videoKey
                  ? 'bg-gray-200 text-gray-900 hover:border-gray-400 hover:bg-gray-400'
                  : 'cursor-default border-gray-500 bg-gray-500 text-gray-700'
              }
            `}
          onClick={handlePlay}
          aria-label="Play"
        >
          <BsFillPlayFill className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <span
          className="
              ml-1 rounded-full
              border-1 bg-transparent
              p-2
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
            "
          onClick={handleFavorites}
          aria-label="Add favorite"
        >
          {isInList ? (
            <FaMinus className="h-2 w-2 sm:h-3 sm:w-3" />
          ) : (
            <FaPlus className="h-2 w-2 sm:h-3 sm:w-3" />
          )}
        </span>
        <span
          className="
              ml-1 rounded-full
              border-1 bg-transparent
              p-1
              outline-none
              transition duration-300
              hover:bg-gray-200 hover:text-gray-900
            "
          onClick={handleOpenModal}
          aria-label="More Info"
        >
          <FiChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </div>
      <h3 className="mt-2 text-left text-xs font-medium xl:text-sm">
        {movieTitle}
      </h3>
      <div className="mt-1 flex items-center space-x-1">
        {genres.map((genre, i) => (
          <span key={i} className="poster-genre flex items-center text-[8px]">
            {genre}
            <span className="ml-1 block h-[5px] w-[5px] rounded-full bg-gray-400" />
          </span>
        ))}
      </div>
    </div>
  );
};
