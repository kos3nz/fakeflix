import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { useRequireLogin } from 'hooks';
import { fetchGenreDataWithCache, getResults } from 'utils';
import { GetServerSideProps } from 'next';
import type { Genres, MediaType } from 'constants/data.config';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

type MovieGenreProps = {
  data: {
    title: string;
    type: MediaType;
    genre: string;
    results: TitleData[];
    totalPages: number;
  };
};

export default function MovieGenre({
  data: { title, type, genre, results, totalPages },
}: MovieGenreProps) {
  useRequireLogin();

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
          <div ref={observe} className="flex justify-center pt-4">
            <Spinner />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  try {
    const { user, redirect } = await checkUser(req);
    if (!user) return redirect;

    const data = await fetchGenreDataWithCache(
      params?.genre as Genres,
      'movie'
    );

    return {
      props: { data, user },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
