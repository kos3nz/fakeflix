import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiChevronRight } from 'react-icons/fi';

const RowSwiper = dynamic(() => import('components/row-swiper'), {
  ssr: false,
});

const Row = ({ movies }) => {
  return (
    <div className="py-[2vh]">
      <h3
        className="
        mb-3 px-[4%]
        font-semibold text-xl
        inline-block
        "
      >
        <Link href="#">
          <a className="flex items-baseline gap-1 row-showmore">
            Top Rated on Fakeflix
            <span className="flex items-center text-sm opacity-0 transition-all duration-700">
              Show all <FiChevronRight />
            </span>
          </a>
        </Link>
      </h3>
      <RowSwiper movies={movies} />
    </div>
  );
};

export default Row;
