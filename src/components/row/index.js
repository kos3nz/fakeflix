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
    <div className="py-[3vh]">
      <h3
        className="
        mb-3 px-[4%]
        font-semibold text-xl
        inline-block
        "
      >
        <Link href={href}>
          <a className="flex items-baseline gap-1 row-showmore">
            {title}
            <span className="flex items-center text-sm opacity-0 transition-all duration-700">
              Show all <FiChevronRight />
            </span>
          </a>
        </Link>
      </h3>
      <RowSwiper movies={movies} isLarge={isLarge} />
    </div>
  );
};

export default Row;
