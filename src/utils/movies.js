import MoviesApi from './api/MoviesApi';

// func
// export async function getCards(value, movies, setMovies, setNotFound, setIsLoading) {
//   setIsLoading(true);
//   const list = await MoviesApi.getInitialCards().finally(() => setIsLoading(false));
//
//   const listRu = list.filter((item) => item.nameRU !== null
//     && item.nameRU
//       .toLowerCase()
//       .includes(value.length > 1 && value.toLowerCase()));
//   const listEn = list.filter((item) => item.nameEN !== null
//     && item.nameEN
//       .toLowerCase()
//       .includes(value.length > 1 && value.toLowerCase()));
//
//   const mergedList = [...new Set([...listRu, ...listEn])];
//
//   if (mergedList.length < 1) setNotFound(true);
//   else {
//     await localStorage.setItem('search', JSON.stringify({ value, movies: mergedList }));
//     setMovies(JSON.parse(localStorage.getItem('search')).movies);
//     setNotFound(false);
//   }
//   return mergedList;
// }
// решил дублировать все же
// export async function getSavedCards(value, movies, setFilteredMovies, setNotFound) {
//   const list = movies;
//   console.log('getSavedCards savedMovies: ', movies);
//
//   const listRu = list.filter((item) => item.nameRU !== null
//     && item.nameRU
//       .toLowerCase()
//       .includes(value.length > 1 && value.toLowerCase()));
//   const listEn = list.filter((item) => item.nameEN !== null
//     && item.nameEN
//       .toLowerCase()
//       .includes(value.length > 1 && value.toLowerCase()));
//
//   const mergedList = [...new Set([...listRu, ...listEn])];
//
//   if (mergedList.length < 1) setNotFound(true);
//   else {
//     setFilteredMovies(mergedList);
//     setNotFound(false);
//   }
// }

export function getSavedSearchedCards(value, movies) {
  console.log('value');
  console.log(value);
  console.log('movies');
  console.log(movies);

  const list = movies;

  const listRu = list.filter((item) => item.nameRU !== null
    && item.nameRU
      .toLowerCase()
      .includes(value.length > 1 && value.toLowerCase()));
  const listEn = list.filter((item) => item.nameEN !== null
    && item.nameEN
      .toLowerCase()
      .includes(value.length > 1 && value.toLowerCase()));

  const mergedList = [...new Set([...listRu, ...listEn])];
  return mergedList;
}

export function getShortFilteredCards(movies, minutes) {
  return movies.filter((item) => item.duration < minutes);
}

export async function getSortedMovies(searchValue, saved) {
  const list = saved && await MoviesApi.getInitialCards();
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
