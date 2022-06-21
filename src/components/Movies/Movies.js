import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getCards } from '../../utils/movies';

function Movies() {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  //
  const onSubmit = useCallback(() => getCards(
    inputValue,
    movies,
    setMovies,
    setNotFound,
    setIsLoading,
  ), [inputValue]);
  //

  useEffect(() => {
    console.log(isFiltered);
  }, [isFiltered]);

  return (
    <main className="movies">
      <SearchForm
        onSubmit={onSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setNotFound={setNotFound}
        setMovies={setMovies}
        setIsFiltered={setIsFiltered}
        searched={movies.length > 1 && notFound === false}
      />
      <MoviesCardList movies={movies} notFound={notFound} isLoading={isLoading} />
    </main>
  );
}

export default Movies;
