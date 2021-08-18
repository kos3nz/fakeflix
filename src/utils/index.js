export const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const fetchResults = async (url) => {
  const data = await fetcher(url);
  return data.results;
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
// cap(...'top_rated'.split('_')) → Top Rated
