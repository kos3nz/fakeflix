import { useEffect } from 'react';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { GetServerSideProps } from 'next';
import { Genres, genresData } from 'constants/data.config';
import { checkUser } from 'db/supabaseClient';
import { useInfiniteFetchData } from 'hooks';

type MovieGenreProps = {
  genre: Genres;
};

export default function MovieGenre({ genre }: MovieGenreProps) {
  const category = genresData[genre].title;
  const { titles, totalPages, reachedEnd, size, setSize } =
    useInfiniteFetchData(`/api/titles/movie/${genre}`);
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
            {category || 'There is no such genre.'}
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  try {
    const { user, redirect } = await checkUser(req);

    if (!user) return redirect;

    return {
      props: { genre: params?.genre },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
