import dynamic from 'next/dynamic';
import Link from 'next/link';
import useInView from 'react-cool-inview';
import { FiChevronRight } from 'react-icons/fi';
import { Spinner } from 'components/Spinner';
import { type Genres, type MediaType, genresData } from 'constants/data.config';
import { MySwiperProps } from 'components/Swiper';

const Swiper = dynamic<MySwiperProps>(
  () => import('components/Swiper').then((mod) => mod.Swiper),
  {
    loading: () => (
      <div className="flex min-h-[100px] items-center justify-center">
        <Spinner />
      </div>
    ),
  }
);

type RowProps = {
  genre: Genres;
  type: MediaType;
};

export const Row = ({ genre, type }: RowProps) => {
  const { title } = genresData[genre];
  const { observe, inView } = useInView({
    unobserveOnEnter: true,
    rootMargin: '50px',
  });

  const href =
    type === 'movie'
      ? `/movies/${genre}`
      : type === 'tv'
      ? `/tvseries/${genre}`
      : `/all/${genre}`;

  return (
    <div className="pb-4 lg:pb-8" ref={observe}>
      <h2
        className="
        text-md mb-2 inline-block px-[7%]
        font-semibold underline decoration-red-700 decoration-2
        underline-offset-2 active:text-gray-400 sm:mb-2 sm:px-[5%] sm:text-lg sm:no-underline lg:text-xl
        "
      >
        <Link href={href}>
          <a className="showmore flex items-baseline space-x-1">
            {title}
            <span className="hidden items-center text-[10px] underline opacity-0 transition-all duration-700 sm:flex sm:text-xs sm:decoration-1 sm:underline-offset-1 lg:text-sm">
              Show all <FiChevronRight />
            </span>
          </a>
        </Link>
      </h2>
      <div className="lg:min-h-[250px min-h-[100px] sm:min-h-[125px]">
        {inView && <Swiper genre={genre} type={type} />}
      </div>
    </div>
  );
};
