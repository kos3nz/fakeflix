import Image from 'next/image';
import { FiChevronDown } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';

const RowPoster = ({ movie, isLarge = false, ...rest }) => {
  const aspectRatio = {
    width: isLarge ? 2 : 16,
    height: isLarge ? 3 : 9,
  };

  return (
    <div className="row-poster" {...rest}>
      <Image
        src={movie.imageUrl}
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
          bg-gradient-to-t from-gray-900 via-gray-900/30
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
          >
            <FiChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
        <h3 className="text-sm font-medium mt-1">{movie.title}</h3>
        <span className="text-[10px]">{movie.genres}</span>
      </div>
    </div>
  );
};

export default RowPoster;
