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
      `https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
  );
  const videosData = await fetchAll(requestsForVideoKey);
  const videoKeys = getOfficialTrailerKeys(videosData);

  return videoKeys;
};

export const getOfficialTrailerKeys = (videosData) => {
  const videoKeys = videosData.map((data) => {
    const officialTrailer = data.results.filter((videoData) => {
      return (
        videoData.key &&
        videoData.site === 'YouTube' &&
        videoData.type === 'Trailer'
      );
    });
    return officialTrailer.length !== 0 ? officialTrailer[0].key : '';
  });
  return videoKeys;
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
  // just keep characters, numbers, and spaces between characters
  return str.replace(/[^a-z0-9 ]/gi, '').trim();
};
