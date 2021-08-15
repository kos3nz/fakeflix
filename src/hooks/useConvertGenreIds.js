import { genresObj } from 'const/genres';

const convertGenreIds = (genreIds = []) => {
  return genreIds.slice(0, 3).map((id) => genresObj[id]);
};

export default convertGenreIds;
