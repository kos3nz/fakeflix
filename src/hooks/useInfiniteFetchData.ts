import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { GenreResponse, TitleData } from 'constants/request-url';
import { fetcher, getResults } from 'utils';

export const useInfiniteFetchData = (url: string) => {
  const { data } = useSWR<GenreResponse>(url, fetcher);
  const {
    data: results,
    size,
    setSize,
  } = useSWRInfinite<TitleData[]>(
    (index) => url + `?page=${index + 2}`,
    getResults
  );
  const totalPages = data && data.total_pages;
  const titles = data && results && data.results.concat(...results);
  const noResult = titles?.length === 0;
  const reachedEnd = size === totalPages || noResult;

  return {
    totalPages,
    titles,
    noResult,
    reachedEnd,
    size,
    setSize,
  };
};
