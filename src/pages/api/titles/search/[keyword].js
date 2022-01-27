import { fetchSearchData } from 'utils';

export default async function fetchSearchResults(req, res) {
  try {
    const { keyword, page } = req.query;
    const { results } = await fetchSearchData(keyword, page);

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).end('Request failed');
  }
}
