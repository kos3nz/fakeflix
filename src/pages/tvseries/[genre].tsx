import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { useRequireLogin } from 'hooks';
import { fetchGenreDataWithCache, getResults } from 'utils';
import type { GetServerSideProps } from 'next';
import type { Genres, MediaType } from 'const/data.config';
import type { TitleData } from 'const/request-url';

type TVGenreProps = {
  title: string;
  type: MediaType;
  genre: string;
  results: TitleData[];
  totalPages: number;
};

export default function TVGenre({
  title,
  type,
  genre,
  results,
  totalPages,
}: TVGenreProps) {
  const { data, size, setSize } = useSWRInfinite<TitleData>(
    (index) => `/api/titles/${type}/${genre}?page=${index + 2}`, // start fetching from page 2
    getResults
  );
  const titles = data ? results.concat(...data) : results;
  const { observe, inView } = useInView({
    rootMargin: '300px',
  });

  useEffect(() => {
    if (inView && size < totalPages) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useRequireLogin();

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
          <div ref={observe} className="flex justify-center pt-8">
            <Spinner />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const data = await fetchGenreDataWithCache(params?.genre as Genres, 'tv');

    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
