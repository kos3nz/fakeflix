import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { checkUser } from 'db/supabaseClient';
import { useInfiniteFetchData } from 'hooks';

const Search = () => {
  const { query } = useRouter();
  const { titles, totalPages, noResult, reachedEnd, size, setSize } =
    useInfiniteFetchData(`/api/titles/search/${query.keyword}`);
  const { observe, inView } = useInView({
    rootMargin: '300px',
  });

  useEffect(() => {
    if (totalPages && inView && size < totalPages) setSize(size + 1);
  }, [inView]);

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="mb-6 text-xl font-bold">{`Search results for : " ${query.keyword} "`}</h2>
          <div className="genre-grid">
            {titles &&
              !noResult &&
              titles.map((data) => <Poster key={data.id} data={data} />)}
          </div>
          {noResult && (
            <div className="flex justify-center pt-8">
              <h2 className="text-xl font-bold">No Results.</h2>
            </div>
          )}
          {!reachedEnd && (
            <div ref={observe} className="flex justify-center pt-4">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { user, redirect } = await checkUser(req);

    if (!user) return redirect;

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
