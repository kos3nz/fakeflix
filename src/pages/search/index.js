import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/layout';
import Poster from 'components/poster';
import { searchTitles, loadMoreSearchTitles } from 'redux/search/search.slice';
import {
  selectSearchResults,
  selectTotalPages,
  selectSearchPage,
  selectSearchError,
} from 'redux/search/search.selectors';
import {
  useIntersectionObserver,
  useRequireLogin,
  useUrlQueryVariable,
} from 'hooks';

const Search = () => {
  const results = useSelector(selectSearchResults);
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectSearchPage);
  const error = useSelector(selectSearchError);
  const dispatch = useDispatch();
  const [bottomPageRef, isIntersecting] = useIntersectionObserver();

  const keyword = useUrlQueryVariable('keyword');

  useEffect(() => {
    if (keyword && results.length === 0) dispatch(searchTitles(keyword));

    if (bottomPageRef && isIntersecting && page <= totalPages) {
      dispatch(loadMoreSearchTitles(keyword));
    }
  }, [bottomPageRef && isIntersecting, page, totalPages]);

  useRequireLogin();

  return (
    <Layout containsFooter={false}>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          {error ? (
            <h2 className="text-xl font-bold capitalize mb-6">
              {error.message}
            </h2>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-6">{`Search results for : " ${keyword} "`}</h2>
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

export default Search;
