// Images
export const MOVIE_IMAGE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

// All
export const TRENDING_MOVIES_AND_TV_SERIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/all/week?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

// Originals
export const NETFLIX_ORIGINALS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv?api_key=${process.env.TMDB_API_KEY}&with_networks=213`;

// Movies
export const TOP_RATED_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const UPCOMING_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const TRENDING_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movies/week?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const ACTION_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`;

export const CATEGORY_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=`;

// TV series
export const TRENDING_TV_SERIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/tv/week?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const CATEGORY_TV_SERIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=`;

// Search queries
export const SEARCH_QUERIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/search/multi?api_key=${process.env.TMDB_API_KEY}&language=${process.env.NEXT_PUBLIC_LANG}&query=`;
