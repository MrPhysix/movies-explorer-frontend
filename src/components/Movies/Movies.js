import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getCards } from '../../utils/movies';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  //
  const onSubmit = useCallback(() => getCards(
    inputValue,
    movies,
    setMovies,
    setNotFound,
  ), [inputValue]);
  //

  useEffect(() => console.log(`notFound: ${notFound}`), [notFound]);
  //
  return (
    <main className="movies">
      <SearchForm
        onSubmit={onSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setNotFound={setNotFound}
        setMovies={setMovies}
        searched={movies.length > 1 && notFound === false}
      />
      <MoviesCardList ARR_LENGTH={12} movies={movies} notFound={notFound} />
    </main>
  );
}

export default Movies;
