import type { Dispatch, SetStateAction } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import cache from 'memory-cache';
import { genresData } from 'constants/data.config';
import type { Genres, MediaType } from 'constants/data.config';
import {
  MOVIE_SEARCH_QUERIES_URL,
  type PersonData,
  type TitleData,
  type SearchResponse,
  type VideoResponse,
} from 'constants/request-url';

export const fetcher = async (url: string, option: AxiosRequestConfig = {}) => {
  const { data } = await axios.get(url, option);
  return data;
};

export const getResults = async (url: string) => {
  const data = await fetcher(url);
  return data.results;
};

export const fetchWithCache = async <Data = any>(
  input: any,
  fetcher: (...args: any[]) => Data | Promise<Data>
): Promise<Data> => {
  const value = cache.get(input);
  if (value) {
    return value;
  } else {
    // In case input has multiple value, put value into array.
    // input: url or input: [ url, options ] are both valid.
    const args = [].concat(input);
    const data = await fetcher(...args);
    cache.put(input, data, 1000 * 60 * 60 * 24 * 7); // 1 week
    return data;
  }
};

export const fetchGenreDataWithCache = async (
  genre: Genres,
  type: 'movie' | 'tv'
): Promise<{
  title: string;
  genre: Genres;
  type: MediaType;
  results: TitleData[];
  totalPages: number;
}> => {
  const { title, url } = genresData[genre];
  const genreUrl = url[type];
  const value = cache.get(genreUrl);

  if (!value) {
    const { results, total_pages } = await fetcher(genreUrl as string);
    await attachOfficialTrailerKeysToResults(results, type);
    const data = { results, totalPages: total_pages };
    cache.put(genreUrl, data, 1000 * 60 * 60 * 24 * 7); // 1 week

    return {
      title,
      genre,
      type,
      ...data,
    };
  }

  return {
    title,
    genre,
    type,
    ...value,
  };
};

const isPerson = (data: TitleData | PersonData): data is PersonData => {
  return data.media_type === 'person';
};

export const fetchSearchData = async (
  keyword: string,
  page?: string | number
) => {
  const { data } = await axios.get<SearchResponse>(
    `${MOVIE_SEARCH_QUERIES_URL}${keyword}&page=${page || 1}`
  );
  const results = data.results.reduce<TitleData[]>((results, result) => {
    if (isPerson(result)) return results.concat(result.known_for);

    return results.concat(result);
  }, []);
  await attachOfficialTrailerKeysToResults(results);

  return {
    results,
    total_pages: data.total_pages,
  };
};

export const fetchSearchDataWithCache = async (
  keyword: string
): Promise<{
  results: TitleData[];
  total_pages: number;
}> => {
  const key = `keyword:${keyword}`;
  const value = cache.get(key);

  if (!value) {
    const results = await fetchSearchData(keyword);
    cache.put(key, results, 1000 * 60 * 60 * 24 * 7); // 1 week

    return {
      ...results,
    };
  }

  return {
    ...value,
  };
};

export const fetchResults = async (url: string) => {
  const res = await fetch(url);
  const errorCode = res.ok ? false : res.status;
  const data = await res.json();
  return { results: data.results, totalPages: data.total_pages, errorCode };
};

export const fetchAll = async (requests: Promise<any>[]) => {
  const responses = await Promise.all(requests);
  const dataArray = await Promise.all(responses.map((res) => res.json()));
  return dataArray;
};

export const attachOfficialTrailerKeysToResults = async (
  results: TitleData[],
  type?: MediaType
) => {
  const videoKeys = await fetchOfficialTrailerKeys(results, type);

  results.forEach((movie, i) => {
    movie.videoKey = videoKeys[i];
  });
};

export const fetchOfficialTrailerKeys = async (
  results: TitleData[],
  type?: MediaType
) => {
  const requestsForVideoKey = results.map((movie) =>
    fetch(
      `https://api.themoviedb.org/3/${type || movie.media_type}/${
        movie.id
      }/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
  );
  const videosData = await fetchAll(requestsForVideoKey);
  const videoKeys = getYoutubeTrailerKeys(videosData);

  return videoKeys;
};

export const getYoutubeTrailerKeys = (videosData: VideoResponse[]) => {
  return videosData.map((data) => {
    const officialTrailer = data.results.filter((videoData) => {
      return (
        videoData.key &&
        videoData.site === 'YouTube' &&
        videoData.type === 'Trailer'
      );
    });

    return officialTrailer.length !== 0 ? officialTrailer[0].key : '';
  });
};

export const getGenres = (type: MediaType) => {
  return (Object.keys(genresData) as Genres[]).filter(
    (genre) => genresData[genre].url[type] !== undefined
  );
};

export const loadMore = async (
  url: string,
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  setTitle: Dispatch<SetStateAction<TitleData[]>>,
  type: MediaType
) => {
  try {
    const { results, errorCode } = await fetchResults(url + `&page=${page}`);
    if (!errorCode) {
      await attachOfficialTrailerKeysToResults(results, type);

      setPage((page) => page + 1);
      setTitle((state) => [...state, ...results]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const truncate = (text: string, chars: number) => {
  return text?.length > chars ? text.slice(0, chars) + '...' : text;
};

export const randomPick = <T>(data: T[]) => {
  return data[Math.floor(Math.random() * data.length)];
};

export const capitalize = (...words: string[]) => {
  return words
    .map((str) => str.charAt(0).toUpperCase() + str.substr(1))
    .join(' ');
};
// capitalize('action') → Action
// capitalize(...'top_rated'.split('_')) → Top Rated
// capitalize(...'action_adventure'.replace('_', '_&_').split('_')) → Action & Adventure

export const removeSymbols = (str: string) => {
  // keep only characters, numbers, and spaces
  return str.replace(/[^a-z0-9 ]/gi, '').trim();
};

export const generateRandomString = () => {
  // return random generated string. ex. 6wz6iparaub
  return Math.random().toString(36).slice(2);
};
