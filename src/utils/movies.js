import MoviesApi from './api/MoviesApi';
import { shortMoviesDuration } from './consts';

export async function getSearchedMovies(searchValue, movies) {
  const list = !movies
    ? await MoviesApi.getInitialCards()
    : movies;

  // console.log(list.filter((item) => item.duration < 40)); чек короткометражки

  const listRu = list.filter((item) => item.nameRU !== null
    && item.nameRU
      .toLowerCase()
      .includes(searchValue.length > 1 && searchValue.toLowerCase()));
  const listEn = list.filter((item) => item.nameEN !== null
    && item.nameEN
      .toLowerCase()
      .includes(searchValue.length > 1 && searchValue.toLowerCase()));

  return [...new Set([...listRu, ...listEn])];
}

export async function getShortFilteredCards(movies) {
  return movies.filter((item) => item.duration < shortMoviesDuration);
}
