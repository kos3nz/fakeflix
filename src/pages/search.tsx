import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { useInfiniteFetchData, useRequireLogin } from 'hooks';

const Search = () => {
  useRequireLogin();

  const { query } = useRouter();

  const { titles, totalPages, reachedEnd, noResult, size, setSize } =
    useInfiniteFetchData(query.keyword as string, 'search');

  const { observe, inView } = useInView({
    rootMargin: '150px',
  });

  useEffect(() => {
    if (totalPages && inView && size < totalPages) setSize(size + 1);
  }, [inView]);

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold mb-6">{`Search results for : " ${query.keyword} "`}</h2>
          <div className="genre-grid">
            {titles &&
              !noResult &&
              titles.map((data, i) => <Poster key={i} data={data} />)}
          </div>
          {!reachedEnd && (
            <div ref={observe} className="flex justify-center pt-8">
              <Spinner />
            </div>
          )}
          {noResult && (
            <div className="flex justify-center pt-8">
              <h2 className="text-xl font-bold">No Results.</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
