import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { genresData, type MediaType, type Genres } from 'constants/data.config';
import type { GenreResponse } from 'constants/request-url';
import { attachOfficialTrailerKeysToResults } from 'utils';

export type Slug = [Extract<MediaType, 'movie' | 'tv'>, Genres];

export default async function fetchMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug, page } = req.query;
    const [type, genre] = slug as Slug;
    const { url } = genresData[genre];
    const genreUrl = url[type];
    const {
      data: { results, total_pages },
    } = await axios.get<GenreResponse>(genreUrl + `&page=${page || 1}`);
    await attachOfficialTrailerKeysToResults(results, type);

    res.status(200).json({
      results,
      total_pages,
    });
  } catch (error) {
    console.error(error);
    res.status(404).end('Request failed');
  }
}
