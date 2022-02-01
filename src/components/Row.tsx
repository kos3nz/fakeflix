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
    loading: () => <Spinner />,
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
    <div className="py-[2vh]" ref={observe}>
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
      {inView && <Swiper genre={genre} type={type} />}
    </div>
  );
};
