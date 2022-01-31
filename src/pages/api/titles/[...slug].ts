import type { NextApiRequest, NextApiResponse } from 'next';
import type { MediaType, Genres } from 'constants/data.config';
import type { GenreResponse } from 'constants/request-url';
import axios from 'axios';
import { genresDataObj } from 'constants/data.config';
import { attachOfficialTrailerKeysToResults } from 'utils';

export type Slug = [Extract<MediaType, 'movie' | 'tv'>, Genres];

export default async function fetchMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug, page } = req.query;
    const [type, genre] = slug as Slug;
    const { urls } = genresDataObj[genre];
    const url = urls[type];
    const {
      data: { results, total_pages },
    } = await axios.get<GenreResponse>(url + `&page=${page || 1}`);
    await attachOfficialTrailerKeysToResults(results, type);

    res.status(200).json({
      results,
      totalPages: total_pages,
    });
  } catch (error) {
    console.error(error);
    res.status(404).end('Request failed');
  }
}
