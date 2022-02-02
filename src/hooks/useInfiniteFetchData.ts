import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { fetchGenreData, fetchSearchData, getResults } from 'utils';
import { type MediaType } from 'constants/data.config';

export const useInfiniteFetchData = (
  key: string,
  type: MediaType | 'search'
) => {
  const fetcher = type === 'search' ? fetchSearchData : fetchGenreData;

  const { data } = useSWR([key, 1, type], fetcher);
  const {
    data: results,
    size,
    setSize,
  } = useSWRInfinite((index) => [key, index + 2, type], getResults);
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
