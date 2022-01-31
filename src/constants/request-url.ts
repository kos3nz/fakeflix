import { GenreId, MediaType } from './data.config';

export interface TitleData {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: GenreId[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title?: string;
  name?: string;
  original_name?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  ageClassification?: string;
  // custom property ↓
  videoKey?: string;
}

export interface PersonData {
  gender: number;
  id: number;
  known_for: TitleData[];
  known_for_department: string;
  media_type: 'person';
  name: string;
  popularity: number;
  profile_path: string;
}

export interface VideoData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type GenreResponse = {
  results: TitleData[];
  total_pages: number;
};

export type SearchResponse = {
  results: (TitleData | PersonData)[];
  total_pages: number;
};

export type VideoResponse = {
  id: number;
  results: VideoData[];
};

// Images
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const ORIGINAL_IMAGE_URL = `${IMAGE_BASE_URL}/original`;
export const W1280_IMAGE_URL = `${IMAGE_BASE_URL}/w1280`;
export const W780_IMAGE_URL = `${IMAGE_BASE_URL}/w780`;
export const LANG = 'en-US';

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
