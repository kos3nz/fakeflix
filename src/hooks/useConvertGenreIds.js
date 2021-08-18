import { genresTitleObj } from 'const/data.config';

const useConvertGenreIds = (genreIds = []) => {
  return genreIds.slice(0, 3).map((id) => genresTitleObj[id]);
};

export default useConvertGenreIds;
