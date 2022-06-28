import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getCards } from '../../utils/movies';

function Movies({ savedMovies, setSavedMovies }) {
  // storage
  const storage = {
    search: JSON.parse(localStorage.getItem('search')),
    filter: JSON.parse(localStorage.getItem('filter')),
  };
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isFiltered, setIsFiltered] = useState(Boolean);
  //
  const onSubmit = useCallback(() => getCards(
    inputValue,
    movies,
    setMovies,
    setNotFound,
    setIsLoading,
  ), [inputValue]);
  //

  useEffect(() => { // storage
    if (storage) {
      if (storage.search && storage.search.movies) setMovies(storage.search.movies);
      if (storage.search && storage.search.value) setInputValue(storage.search.value);
      if (storage.filter !== null) setIsFiltered(storage.filter);
    }
  }, [storage.filter]);

  useEffect(() => {
    console.log(`isFiltered : ${isFiltered}`);
  }, [isFiltered]);

  const filterHandle = useCallback(
    (checked) => {
      setIsFiltered(checked);
      localStorage.setItem('filter', JSON.stringify(checked));
    },
    [setIsFiltered],
  );

  return (
    <main className="movies">
      <SearchForm
        onSubmit={onSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setNotFound={setNotFound}
        setMovies={setMovies}
        isFiltered={isFiltered}
        filterHandle={filterHandle}
        searched={movies.length > 1 && notFound === false}
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
