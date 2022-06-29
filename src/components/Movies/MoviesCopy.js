import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getCards, getShortFilteredCards } from '../../utils/movies';
import { shortMoviesDuration } from '../../utils/consts';

function Movies({ savedMovies, setSavedMovies }) {
  // storage
  const storage = {
    search: JSON.parse(localStorage.getItem('search')),
    filter: JSON.parse(localStorage.getItem('filter')),
  };
  // states
  const [isLoading, setIsLoading] = useState(false);
  //
  const [movies, setMovies] = useState([]);
  //
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  //
  const getSearchedCards = useCallback(() => getCards(
    inputValue,
    movies,
    setMovies,
    setNotFound,
    setIsLoading,
  ), [inputValue]);

  // handlers
  const filterHandle = useCallback(
    (checked) => {
      setIsFiltered(checked);
      localStorage.setItem('filter', JSON.stringify(checked));
    },
    [setIsFiltered],
  );

  // effects
  useEffect(() => { // storage
    if (storage) {
      if (storage.search && storage.search.movies) setMovies(storage.search.movies);
      if (storage.search && storage.search.value) setInputValue(storage.search.value);
      if (storage.filter !== null) setIsFiltered(storage.filter);
    }
    console.log('inputValue: ', inputValue);
    console.log('isFiltered: ', isFiltered);
    console.log('movies: ', movies);
  }, [storage.filter]);

  useEffect(() => {
    if (isFiltered) {
      const newMovies = getShortFilteredCards(movies, shortMoviesDuration);
      setMovies(newMovies);
    }
    if (!isFiltered) {
      if (storage.search !== null) setMovies(storage.search.movies);
      setMovies([]);
    }
  }, [isFiltered]);

  useEffect(() => {
    if (!isFiltered) setMovies(movies);
  }, [movies]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  useEffect(() => {
    console.log('notFound: ', notFound);
  }, [notFound]);

  return (
    <main className="movies">
      <SearchForm
        onSubmit={getSearchedCards}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setNotFound={setNotFound}
        setMovies={setMovies}
        isFiltered={isFiltered}
        filterHandle={filterHandle}
        // searched={movies.length > 1 && notFound === false}
        searched
      />
      <MoviesCardList
        movies={movies}
        notFound={notFound}
        isLoading={isLoading}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
      />
    </main>
  );
}

export default Movies;
