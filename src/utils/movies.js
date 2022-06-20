import MoviesApi from './api/MoviesApi';

export const ad = 1;

// func
export async function getCards(value, movies, setMovies, setNotFound) {
  const list = await MoviesApi.getInitialCards();

  console.log();
  const listRu = list.filter((item) => item.nameRU !== null
    && item.nameRU
      .toLowerCase()
      .includes(value.length > 1 && value.toLowerCase()));
  const listEn = list.filter((item) => item.nameEN !== null
    && item.nameEN
      .toLowerCase()
      .includes(value.length > 1 && value.toLowerCase()));

  const mergedList = [...new Set([...listRu, ...listEn])];

  if (mergedList.length < 1) setNotFound(true);
  else {
    setMovies(mergedList);
    setNotFound(false);
  }
}
