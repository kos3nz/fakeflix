import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import Layout from 'components/layout';
import Poster from 'components/poster';
import Loader from 'components/loader';
import { useRequireLogin } from 'hooks';
import { fetchSearchDataWithCache, getResults } from 'utils';

const Search = ({ results, totalPages }) => {
  useRequireLogin();

  const { observe, inView } = useInView({
    rootMargin: '300px',
  });
  const { query } = useRouter();
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/api/titles/search/${query.keyword}?page=${index + 2}`,
    getResults
  );
  const titles = data ? results.concat(...data) : results;
  const noResult = titles.length === 0;
  const reachedEnd = size === totalPages || noResult;

  useEffect(() => {
    if (inView && size < totalPages) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold mb-6">{`Search results for : " ${query.keyword} "`}</h2>
          <div className="genre-grid">
            {!noResult &&
              titles.map((title, i) => <Poster key={i} movie={title} />)}
          </div>
          {!reachedEnd && (
            <div ref={observe} className="flex justify-center pt-8">
              <Loader />
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

export async function getServerSideProps({ query }) {
  try {
    const data = await fetchSearchDataWithCache(query.keyword);

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
}
