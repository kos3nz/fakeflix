import axios from 'axios';
import cache from 'memory-cache';
import { genresDataObj } from 'const/data.config';
import { MOVIE_SEARCH_QUERIES_URL } from 'const/request-url';

export const axiosFetcher = async (url, option = {}) => {
  const { data } = await axios.get(url, option);
  return data;
};

export const getResults = async (url) => {
  const data = await axiosFetcher(url);
  return data.results;
};

// 第一引数にurl、または [ url, options] を入れます。
// この関数をgetServerSidePropsの中でdata = await fetchWithCache(url);のように使用します。
export const fetchWithCache = async (input, fetcher) => {
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

export const fetchGenreDataWithCache = async (genre, type) => {
  const { title, urls } = genresDataObj[genre];
  const url = urls[type];
  const value = cache.get(url);

  if (!value) {
    const { results, total_pages } = await axiosFetcher(url);
    await attachOfficialTrailerKeysToResults(results, type);
    const data = { results, totalPages: total_pages };
    cache.put(url, data, 1000 * 60 * 60 * 24 * 7); // 1 week

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

export const fetchSearchData = async (keyword, page = 1) => {
  const { data } = await axios.get(
    `${MOVIE_SEARCH_QUERIES_URL}${keyword}&page=${page || 1}`
  );
  const results = data.results.reduce((results, result) => {
    if (result.media_type === 'movie' || result.media_type === 'tv') {
      return results.concat(result);
    } else if (result.media_type === 'person') {
      return results.concat(result.known_for);
    }
    return results;
  }, []);
  await attachOfficialTrailerKeysToResults(results);

  return {
    results,
    totalPages: data.total_pages,
  };
};

export const fetchSearchDataWithCache = async (keyword) => {
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

export const fetchResults = async (url) => {
  const res = await fetch(url);
  const errorCode = res.ok ? false : res.status;
  const data = await res.json();
  return { results: data.results, totalPages: data.total_pages, errorCode };
};

export const fetchAll = async (requests) => {
  const responses = await Promise.all(requests);
  const dataArray = await Promise.all(responses.map((res) => res.json()));
  return dataArray;
};

export const attachOfficialTrailerKeysToResults = async (results, type) => {
  const videoKeys = await fetchOfficialTrailerKeys(results, type);

  results.forEach((movie, i) => {
    movie.videoKey = videoKeys[i];
  });
};

export const fetchOfficialTrailerKeys = async (results, type) => {
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

export const getYoutubeTrailerKeys = (videosData) => {
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

export const loadMore = async (url, page, setPage, setTitle, type) => {
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

export const truncate = (text, chars) => {
  return text?.length > chars ? text.slice(0, chars) + '...' : text;
};

export const randomPick = (data) => {
  return data[Math.floor(Math.random() * data.length)];
};

export const capitalize = (...words) => {
  return words
    .map((str) => str.charAt(0).toUpperCase() + str.substr(1))
    .join(' ');
};
// capitalize('action') → Action
// capitalize(...'top_rated'.split('_')) → Top Rated
// capitalize(...'action_adventure'.replace('_', '_&_').split('_')) → Action & Adventure

export const removeSymbols = (str) => {
  // keep only characters, numbers, and spaces
  return str.replace(/[^a-z0-9 ]/gi, '').trim();
};
