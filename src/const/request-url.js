// Images
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const ORIGINAL_IMAGE_URL = `${IMAGE_BASE_URL}/original`;
export const W1280_IMAGE_URL = `${IMAGE_BASE_URL}/w1280`;
export const W780_IMAGE_URL = `${IMAGE_BASE_URL}/w780`;
export const LANG = 'en-US';

// All
// export const TRENDING_MOVIES_AND_TV_SERIES_URL = `${BASE_URL}/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`;

// Originals
export const NETFLIX_ORIGINALS_URL = `${BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_networks=213`;

// Movies
export const TOP_RATED_MOVIES_URL = `${BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`;

export const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`;

export const TRENDING_MOVIES_URL = `${BASE_URL}/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`;

export const GENRE_MOVIES_URL = `${BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&with_genres=`;

// TV series
export const TRENDING_TV_SERIES_URL = `${BASE_URL}/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`;

export const GENRE_TV_SERIES_URL = `${BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&with_genres=`;

// Search queries
export const MOVIE_SEARCH_QUERIES_URL = `${BASE_URL}/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${LANG}&query=`;
