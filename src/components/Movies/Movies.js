import React, { useEffect, useState, useCallback } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getSortedMovies } from '../../utils/movies';
import useFormValidator from '../../hooks/useFormValidator';

function Movies({ savedMovies, setSavedMovies }) {
  // consts
  // states
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // form hook
  const form = useFormValidator();
  const { search } = form.values;
  const { handleChange, resetForm } = form;

  // handlers
  const handleSubmit = useCallback(
    () => {
      if (search) {
        setIsLoading(true);
        getSortedMovies(search, true).then((list) => {
          if (list.length > 0) {
            setMovies(list);
          } else setNotFound(true);
          setIsLoading(false);
        });
      }
    },
    [search],
  );

  const onSearchReset = () => {
    setNotFound(false);
    setMovies([]);
    resetForm();
  };

  // effects
  useEffect(() => {
    console.log('savedMovies');
    console.log(savedMovies);
    console.log('movies');
    console.log(movies);
  }, [movies, savedMovies]);

  useEffect(() => {
    console.log('search');
    console.log(search);
  }, [search]);

  return (
    <main className="movies">
      <SearchForm
        searchValue={search}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onSearchReset={onSearchReset}
        inSavedMovies={false}
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
