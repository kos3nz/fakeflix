import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { axiosFetcher, getPaths, getResults } from 'utils';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Genres, genresData, MediaType } from 'constants/data.config';
import type { GenreResponse, TitleData } from 'constants/request-url';
import { useRequireLogin } from 'hooks';

type TVGenreProps = {
  genre: Genres;
  type: MediaType;
  title: string;
};

export default function TVGenre({ genre, type, title }: TVGenreProps) {
  useRequireLogin();

  const { data } = useSWR<GenreResponse>(
    `/api/titles/${type}/${genre}`,
    axiosFetcher
  );
  const {
    data: results,
    size,
    setSize,
  } = useSWRInfinite<TitleData>(
    (index) => `/api/titles/${type}/${genre}?page=${index + 2}`, // start fetching from page 2
    getResults
  );
  const totalPages = data && data.total_pages;
  const titles = data && results && data.results.concat(...results);
  const reachedEnd = size === totalPages;

  const { observe, inView } = useInView({
    rootMargin: '300px',
  });

  useEffect(() => {
    if (totalPages && inView && size < totalPages) {
      setSize(size + 1);
    }
  }, [inView]);

  return (
    <Layout>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold capitalize mb-6">
            {title || 'There is no such genre.'}
          </h2>
          <div className="genre-grid">
            {titles && titles.map((data, i) => <Poster key={i} data={data} />)}
          </div>
          {!reachedEnd && (
            <div ref={observe} className="flex justify-center pt-4">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths('tv');

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const genre = params?.genre as Genres;
  const title = genresData[genre].title;

  return {
    props: {
      title,
      genre,
      type: 'tv',
    },
  };
};
