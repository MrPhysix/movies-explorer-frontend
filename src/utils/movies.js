import MoviesApi from './api/MoviesApi';

export const ad = 1;

// func
export async function getCards(value, movies, setMovies, setNotFound, setIsLoading) {
  setIsLoading(true);
  const list = await MoviesApi.getInitialCards().finally(() => setIsLoading(false));

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
    await localStorage.setItem('search', JSON.stringify({ value, movies: mergedList }));
    setMovies(JSON.parse(localStorage.getItem('search')).movies);
    setNotFound(false);
  }
}
