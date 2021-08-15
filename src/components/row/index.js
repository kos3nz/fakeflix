import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiChevronRight } from 'react-icons/fi';

const RowSwiper = dynamic(() => import('components/row-swiper'), {
  ssr: false,
});

const Row = ({ row: { title, movies, isLarge } }) => {
  return (
    <div className="py-[3vh]">
      <h3
        className="
        mb-3 px-[4%]
        font-semibold text-xl
        inline-block
        "
      >
        <Link href="#">
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
