import axios from 'axios';
import { genresDataObj } from 'const/data.config';
import { attachOfficialTrailerKeysToResults } from 'utils';

export default async function fetchMovies(req, res) {
  try {
    const { slug, page } = req.query;
    const [type, genre] = slug;
    const { urls } = genresDataObj[genre];
    const url = urls[type];
    const {
      data: { results, total_pages },
    } = await axios.get(url + `&page=${page || 1}`);
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
