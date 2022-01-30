import { GenreId, genresTitlesById } from 'const/data.config';

export const useConvertGenreIds = (genreIds: GenreId[]) => {
  return genreIds.slice(0, 3).map((id) => genresTitlesById[id]);
};
