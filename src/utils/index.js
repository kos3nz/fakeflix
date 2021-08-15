export const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const fetchMovies = async (url) => {
  const data = await fetcher(url);
  return data.results;
};

export const truncate = (text, chars) => {
  return text?.length > chars ? text.slice(0, chars) + '...' : text;
};

export const randomPick = (data) => {
  return Math.floor(Math.random() * data.length);
};
