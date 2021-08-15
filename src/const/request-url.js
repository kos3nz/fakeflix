export const MOVIE_IMAGE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

export const TOP_RATED_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=${process.env.NEXT_PUBLIC_LANG}`;

export const UPCOMING_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const POPULAR_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movies/week?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&language=${process.env.NEXT_PUBLIC_LANG}`;

export const ACTION_MOVIES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`;
