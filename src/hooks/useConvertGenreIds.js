import { genresTitlesById } from 'const/data.config';

const useConvertGenreIds = (genreIds = []) => {
  return genreIds.slice(0, 3).map((id) => genresTitlesById[id]);
};

export default useConvertGenreIds;
