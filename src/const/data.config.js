import {
  TRENDING_MOVIES_AND_TV_SERIES_URL,
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  CATEGORY_MOVIES_URL,
  NETFLIX_ORIGINALS_URL,
  TRENDING_TV_SERIES_URL,
  CATEGORY_TV_SERIES_URL,
} from 'const/request-url';

export const moviesGenresList = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const tvSeriesGenresList = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

export const genresTitlesById = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

export const genresIdByTitle = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science_fiction: 878,
  tv_movie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
  action_adventure: 10759,
  kids: 10762,
  news: 10763,
  reality: 10764,
  'sci-fi_fantasy': 10765,
  soap: 10766,
  talk: 10767,
  war_politics: 10768,
};

export const genresData = [
  {
    title: 'Top Rated on Fakeflix',
    url: {
      movie: TOP_RATED_MOVIES_URL,
    },
    slug: 'top_rated',
  },
  {
    title: 'Trending Now',
    url: {
      movie: TRENDING_MOVIES_URL,
      tv: TRENDING_TV_SERIES_URL,
      // all: TRENDING_MOVIES_AND_TV_SERIES_URL,
    },
    slug: 'trending',
  },

  {
    title: 'Fakeflix Originals',
    url: {
      tv: NETFLIX_ORIGINALS_URL,
    },
    slug: 'originals',
    isLarge: true,
  },
  {
    title: 'Action',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.action,
    },
    slug: 'action',
  },
  {
    title: 'Adventure',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.adventure,
    },
    slug: 'adventure',
  },
  {
    title: 'Animation',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.animation,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.animation,
    },
    slug: 'animation',
  },
  {
    title: 'Comedy',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.comedy,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.comedy,
    },
    slug: 'comedy',
  },
  {
    title: 'Crime',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.crime,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.crime,
    },
    slug: 'crime',
  },
  {
    title: 'Documentary',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.documentary,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.documentary,
    },
    slug: 'documentary',
  },
  {
    title: 'Drama',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.drama,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.drama,
    },
    slug: 'drama',
  },
  {
    title: 'Family',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.family,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.family,
    },
    slug: 'family',
  },
  {
    title: 'Fantasy',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.fantasy,
    },
    slug: 'fantasy',
  },
  {
    title: 'History',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.history,
    },
    slug: 'history',
  },
  {
    title: 'Horror',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.horror,
    },
    slug: 'horror',
  },
  {
    title: 'Music',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.music,
    },
    slug: 'music',
  },
  {
    title: 'Mystery',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.mystery,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.mystery,
    },
    slug: 'mystery',
  },
  {
    title: 'Romance',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.romance,
    },
    slug: 'romance',
  },
  {
    title: 'Science Fiction',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.science_fiction,
    },
    slug: 'science_fiction',
  },
  {
    title: 'TV Movie',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.tv_movie,
    },
    slug: 'tv_movie',
  },
  {
    title: 'Thriller',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.thriller,
    },
    slug: 'thriller',
  },
  {
    title: 'War',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.war,
    },
    slug: 'war',
  },
  {
    title: 'Western',
    url: {
      movie: CATEGORY_MOVIES_URL + genresIdByTitle.western,
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.western,
    },
    slug: 'western',
  },
  {
    title: 'Action & Adventure',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.action_adventure,
    },
    slug: 'action_adventure',
  },
  {
    title: 'Kids',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.kids,
    },
    slug: 'kids',
  },
  {
    title: 'News',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.news,
    },
    slug: 'news',
  },
  {
    title: 'Reality',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.reality,
    },
    slug: 'reality',
  },
  {
    title: 'Sci-Fi & Fantasy',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle['sci-fi_fantasy'],
    },
    slug: 'sci-fi_fantasy',
  },
  {
    title: 'Soap',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.soap,
    },
    slug: 'soap',
  },
  {
    title: 'Talk',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.talk,
    },
    slug: 'talk',
  },
  {
    title: 'War & Politics',
    url: {
      tv: CATEGORY_TV_SERIES_URL + genresIdByTitle.war_politics,
    },
    slug: 'war_politics',
  },
  {
    title: 'Upcoming',
    url: {
      movie: UPCOMING_MOVIES_URL,
    },
    slug: 'upcoming',
  },
];

export const homeTitles = [
  'top_rated',
  'trending',
  'originals',
  'action',
  'adventure',
  'family',
  'comedy',
  'drama',
  'romance',
  'animation',
  'music',
  'horror',
  'upcoming',
];

export const moviesCategoryPaths = [
  'top_rated',
  'trending',
  'action',
  'adventure',
  'family',
  'comedy',
  'drama',
  'romance',
  'animation',
  'music',
  'horror',
  'upcoming',
];

export const tvSeriesCategoryPaths = [
  'trending',
  'originals',
  'action_adventure',
  'family',
  'comedy',
  'drama',
  'mystery',
  'animation',
  'kids',
  'documentary',
  'reality',
  'sci-fi_fantasy',
];