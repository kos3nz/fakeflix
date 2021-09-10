import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import RowSwiper from 'components/row-swiper';

const Row = ({ row: { title, movies, isLarge, slug, type } }) => {
  const href =
    type === 'movie'
      ? `/movies/${slug}`
      : type === 'tv'
      ? `/tvseries/${slug}`
      : `/all/${slug}`;

  return (
    <div className="py-[2vh]">
      <h2
        className="
        mb-2 xs:mb-3 px-[7%] sm:px-[5%]
        font-semibold text-md sm:text-lg lg:text-xl
        inline-block
        "
      >
        <Link href={href}>
          <a className="flex items-baseline gap-1 row-showmore">
            {title}
            <span className="flex items-center text-[10px] sm:text-xs lg:text-sm opacity-0 transition-all duration-700">
              Show all <FiChevronRight />
            </span>
          </a>
        </Link>
      </h2>
      <RowSwiper movies={movies} isLarge={isLarge} />
    </div>
  );
};

export default Row;
