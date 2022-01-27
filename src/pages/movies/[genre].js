import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import Layout from 'components/layout';
import Poster from 'components/poster';
import Loader from 'components/loader';
import { useRequireLogin } from 'hooks';
import { fetchGenreDataWithCache, getResults } from 'utils';

const MoviesGenre = ({ title, type, genre, results, totalPages }) => {
  const { data, size, setSize } = useSWRInfinite(
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
            {titles &&
              titles.map((movie, i) => <Poster key={i} movie={movie} />)}
          </div>
          <div ref={observe} className="flex justify-center pt-4">
            <Loader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesGenre;

export async function getServerSideProps({ params: { genre } }) {
  try {
    const data = await fetchGenreDataWithCache(genre, 'movie');

    return {
      props: { ...data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
