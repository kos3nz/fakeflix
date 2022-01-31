import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchSearchData } from 'utils';

export default async function fetchSearchResults(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { keyword, page } = req.query;
    const { results } = await fetchSearchData(
      keyword as string,
      page as string
    );

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).end('Request failed');
  }
}
