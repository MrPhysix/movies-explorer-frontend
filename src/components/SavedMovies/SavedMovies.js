// import React, { useCallback, useEffect, useState } from 'react';
// import './SavedMovies.css';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SearchForm from '../SearchForm/SearchForm';
// import { getSavedSearchedCards } from '../../utils/movies';
//
// function SavedMovies({ savedMovies, setSavedMovies }) {
//   // const
//   // const sortedMovies = getShortFilteredCards(savedMovies, shortMoviesDuration);
//   // storage
//   const storage = {
//     savedSearch: JSON.parse(localStorage.getItem('savedSearch')),
//   };
//
//   console.log(storage);
//   // states
//   const [isLoading, setIsLoading] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [notFound, setNotFound] = useState(false);
//   const [isFiltered, setIsFiltered] = useState(Boolean);
//   const [isSearched, setIsSearched] = useState(Boolean);
//   // handlers
//
//   const handleSearch = async () => {
//     setIsLoading(true);
//     const searchedMovies = await getSavedSearchedCards(inputValue, savedMovies);
//     setTimeout(() => {
//       console.log(savedMovies);
//       localStorage.setItem('savedSearch', JSON.stringify({
//         search: inputValue,
//         movies: searchedMovies,
//       }));
//       setMovies(storage.savedSearch.movies);
//       setIsSearched(true);
//       setIsLoading(false);
//     }, 300);
//   };
//
//   const handleFilter = useCallback(
//     (checked) => {
//       setIsFiltered(checked);
//       localStorage.setItem('filter', JSON.stringify(checked));
//     },
//     [setIsFiltered],
//   );
//
//   // effects
//   useEffect(() => { // storage
//     if (storage) {
//       if (storage.savedSearch
//       && storage.savedSearch.movies) setMovies(storage.savedSearch.movies);
//       if (storage.savedSearch
//       && storage.savedSearch.search) setInputValue(storage.savedSearch.search);
//       if (storage.filter !== null) setIsFiltered(storage.filter);
//       if (storage.savedSearch. !== null) setIsFiltered(storage.filter);
//     }
//   }, []);
//
//   ///
//
//   useEffect(() => {
//     console.log('isFiltered');
//     console.log(isFiltered);
//   }, [isFiltered]);
//
//   useEffect(() => {
//     console.log('inputValue');
//     console.log(inputValue);
//   }, [inputValue]);
//
//   useEffect(() => {
//     console.log('isLoading');
//     console.log(isLoading);
//   }, [isLoading]);
//
//   useEffect(() => {
//     console.log('movies');
//     console.log(movies);
//   }, [movies]);
//
//   useEffect(() => {
//     console.log('savedMovies');
//     console.log(savedMovies);
//   }, [savedMovies]);
//
//   return (
//     <main className="saved-movies">
//       <SearchForm
//         onSubmit={handleSearch}
//         inputValue={inputValue}
//         setInputValue={setInputValue}
//         setNotFound={setNotFound}
//         handleFilter={handleFilter}
//         movies={movies}
//         setMovies={setMovies}
//         isFiltered={isFiltered}
//         setIsFiltered={setIsFiltered}
//         searched
//         inSavedMovies
//         savedMovies={savedMovies}
//         setSavedMovies={setSavedMovies}
//       />
//       <MoviesCardList
//         inSavedMovies
//         movies={movies}
//         savedMovies={savedMovies}
//         setSavedMovies={setSavedMovies}
//         notFound={notFound}
//         isLoading={isLoading}
//       />
//     </main>
//   );
// }
//
// export default SavedMovies;
//
// // const onSubmit = useCallback(() => {
// //   getSavedCards(
// //     inputValue,
// //     savedMovies,
// //     setFilteredMovies,
// //     setNotFound,
// //     setIsLoading,
// //   );
// //   setIsSearched(true);
// // }, [inputValue]);
// // //
// // useEffect(() => { // storage
// //   if (storage) {
// //     if (storage.search && storage.search.movies) setMovies(storage.search.movies);
// //     if (storage.search && storage.search.value) setInputValue(storage.search.value);
// //     if (storage.filter !== null) setIsFiltered(storage.filter);
// //   }
// // }, [storage.filter]);
// //
// // useEffect(() => {
// //   setMovies(savedMovies);
// //   console.log('filteredMovies');
// //   console.log(filteredMovies);
// // }, []);
// //
// // useEffect(() => {
// //   console.log('savedMovies');
// //   console.log(savedMovies);
// // }, [savedMovies]);
// //
// // useEffect(() => {
// //   console.log('movies');
// //   console.log(movies);
// // }, [movies]);
// //
// // const filterHandle = useCallback(
// //   (checked) => {
// //     setIsFiltered(checked);
// //     localStorage.setItem('filter', JSON.stringify(checked));
// //   },
// //   [setIsFiltered],
// // );
