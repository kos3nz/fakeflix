import {
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  GENRE_MOVIES_URL,
  NETFLIX_ORIGINALS_URL,
  TRENDING_TV_SERIES_URL,
  GENRE_TV_SERIES_URL,
} from 'constants/request-url';

export type MediaType = 'movie' | 'tv';

export type Genres =
  | 'top_rated'
  | 'trending'
  | 'originals'
  | 'action'
  | 'adventure'
  | 'animation'
  | 'comedy'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'fantasy'
  | 'history'
  | 'horror'
  | 'music'
  | 'mystery'
  | 'romance'
  | 'science_fiction'
  | 'tv_movie'
  | 'thriller'
  | 'war'
  | 'western'
  | 'action_adventure'
  | 'kids'
  | 'news'
  | 'reality'
  | 'sci-fi_fantasy'
  | 'soap'
  | 'talk'
  | 'war_politics'
  | 'upcoming';

type GenresDataObject = {
  [key in Genres]: {
    title: string;
    urls: {
      [key in Extract<MediaType, 'movie' | 'tv'>]?: string;
    };
    slug: Genres;
  };
};

export type GenreId = keyof typeof genresTitlesById;

export const homeGenres: Genres[] = [
  'top_rated',
  'trending',
  'originals',
  'action',
  'family',
  'drama',
  'romance',
  'music',
  'horror',
  'upcoming',
];

export const movieGenres: Genres[] = [
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

export const tvSeriesGenres: Genres[] = [
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
} as const;

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
} as const;

export const genresDataObj: GenresDataObject = {
  top_rated: {
    title: 'Top Rated on Fakeflix',
    urls: {
      movie: TOP_RATED_MOVIES_URL,
    },
    slug: 'top_rated',
  },
  trending: {
    title: 'Trending Now',
    urls: {
      movie: TRENDING_MOVIES_URL,
      tv: TRENDING_TV_SERIES_URL,
    },
    slug: 'trending',
  },
  originals: {
    title: 'Fakeflix Originals',
    urls: {
      tv: NETFLIX_ORIGINALS_URL,
    },
    slug: 'originals',
  },
  action: {
    title: 'Action',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.action,
    },
    slug: 'action',
  },
  adventure: {
    title: 'Adventure',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.adventure,
    },
    slug: 'adventure',
  },
  animation: {
    title: 'Animation',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.animation,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.animation,
    },
    slug: 'animation',
  },
  comedy: {
    title: 'Comedy',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.comedy,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.comedy,
    },
    slug: 'comedy',
  },
  crime: {
    title: 'Crime',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.crime,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.crime,
    },
    slug: 'crime',
  },
  documentary: {
    title: 'Documentary',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.documentary,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.documentary,
    },
    slug: 'documentary',
  },
  drama: {
    title: 'Drama',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.drama,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.drama,
    },
    slug: 'drama',
  },
  family: {
    title: 'Family',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.family,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.family,
    },
    slug: 'family',
  },
  fantasy: {
    title: 'Fantasy',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.fantasy,
    },
    slug: 'fantasy',
  },
  history: {
    title: 'History',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.history,
    },
    slug: 'history',
  },
  horror: {
    title: 'Horror',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.horror,
    },
    slug: 'horror',
  },
  music: {
    title: 'Music',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.music,
    },
    slug: 'music',
  },
  mystery: {
    title: 'Mystery',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.mystery,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.mystery,
    },
    slug: 'mystery',
  },
  romance: {
    title: 'Romance',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.romance,
    },
    slug: 'romance',
  },
  science_fiction: {
    title: 'Science Fiction',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.science_fiction,
    },
    slug: 'science_fiction',
  },
  tv_movie: {
    title: 'TV Movie',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.tv_movie,
    },
    slug: 'tv_movie',
  },
  thriller: {
    title: 'Thriller',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.thriller,
    },
    slug: 'thriller',
  },
  war: {
    title: 'War',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.war,
    },
    slug: 'war',
  },
  western: {
    title: 'Western',
    urls: {
      movie: GENRE_MOVIES_URL + genresIdByTitle.western,
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.western,
    },
    slug: 'western',
  },
  action_adventure: {
    title: 'Action & Adventure',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.action_adventure,
    },
    slug: 'action_adventure',
  },
  kids: {
    title: 'Kids',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.kids,
    },
    slug: 'kids',
  },
  news: {
    title: 'News',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.news,
    },
    slug: 'news',
  },
  reality: {
    title: 'Reality',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.reality,
    },
    slug: 'reality',
  },
  'sci-fi_fantasy': {
    title: 'Sci-Fi & Fantasy',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle['sci-fi_fantasy'],
    },
    slug: 'sci-fi_fantasy',
  },
  soap: {
    title: 'Soap',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.soap,
    },
    slug: 'soap',
  },
  talk: {
    title: 'Talk',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.talk,
    },
    slug: 'talk',
  },
  war_politics: {
    title: 'War & Politics',
    urls: {
      tv: GENRE_TV_SERIES_URL + genresIdByTitle.war_politics,
    },
    slug: 'war_politics',
  },
  upcoming: {
    title: 'Upcoming',
    urls: {
      movie: UPCOMING_MOVIES_URL,
    },
    slug: 'upcoming',
  },
};
