import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/layout';
import Poster from 'components/poster';
import { loadMoreSearchTitles } from 'redux/search/search.slice';
import {
  selectSearchResults,
  selectTotalPages,
  selectSearchPage,
  selectSearchQuery,
  selectSearchError,
} from 'redux/search/search.selectors';
import { useIntersectionObserver, useRequireLogin } from 'hooks';

const SearchPage = () => {
  const results = useSelector(selectSearchResults);
  const totalPages = useSelector(selectTotalPages);
  const query = useSelector(selectSearchQuery);
  const page = useSelector(selectSearchPage);
  const error = useSelector(selectSearchError);
  const dispatch = useDispatch();
  const [bottomPageRef, isIntersecting] = useIntersectionObserver();
  const user = useRequireLogin();

  useEffect(() => {
    if (bottomPageRef && isIntersecting && page <= totalPages) {
      dispatch(loadMoreSearchTitles());
    }
  }, [bottomPageRef && isIntersecting, page, totalPages]);

  if (!user) return <div>redirecting...</div>;

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-[120px] lg:pt-20">
        <div className="py-8 px-[4vw]">
          {error ? (
            <h2 className="text-xl font-bold capitalize mb-6">
              {error.message}
            </h2>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-6">{`Search results for : " ${query} "`}</h2>
              <div className="category-grid">
                {results.map((result, i) => (
                  <Poster key={i} movie={result} />
                ))}
              </div>
            </>
          )}
          <div ref={bottomPageRef} className="w-full h-10" />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
