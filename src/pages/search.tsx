import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { fetchSearchDataWithCache, getResults } from 'utils';
import type { TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

type SearchProps = {
  data: { results: TitleData[]; totalPages: number };
};

const Search = ({ data: { results, totalPages } }: SearchProps) => {
  const { observe, inView } = useInView({
    rootMargin: '300px',
  });
  const { query } = useRouter();
  const { data, size, setSize } = useSWRInfinite<TitleData>(
    (index) => `/api/titles/search/${query.keyword}?page=${index + 2}`,
    getResults
  );
  const titles = data ? results.concat(...data) : results;
  const noResult = titles.length === 0;
  const reachedEnd = size === totalPages || noResult;

  useEffect(() => {
    if (inView && size < totalPages) setSize(size + 1);
  }, [inView]);

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold mb-6">{`Search results for : " ${query.keyword} "`}</h2>
          <div className="genre-grid">
            {!noResult &&
              titles.map((data) => <Poster key={data.id} data={data} />)}
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  try {
    const { user, redirect } = await checkUser(req);
    if (!user) return redirect;

    const data = await fetchSearchDataWithCache(query.keyword as string);

    return {
      props: {
        data,
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
