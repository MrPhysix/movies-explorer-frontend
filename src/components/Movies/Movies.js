import React, { useEffect, useState, useCallback } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getSearchedMovies, getShortFilteredCards } from '../../utils/movies';
import useFormValidator from '../../hooks/useFormValidator';

function Movies({ savedMovies, setSavedMovies }) {
  // const
  // states
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [originMovies, setOriginMovies] = useState([]);

  const [isSorted, setIsSorted] = useState(Boolean);
  const [notFound, setNotFound] = useState(false);

  // form hook
  const form = useFormValidator();
  const { search } = form.values;
  const { handleChange, resetForm } = form;

  // handlers

  const getInitialMovies = () => {
    getSearchedMovies(search, true).then((list) => {
      if (list.length > 0) {
        setOriginMovies(list);
        setMovies(list);
      } else setNotFound(true);
      setIsLoading(false);
    });
  };

  const getSortedMovies = () => {
    getShortFilteredCards(movies).then((res) => {
      if (res && res.length > 0) setMovies(res);
      else setNotFound(true);
    });
  };

  const handleSubmit = useCallback(
    () => {
      if (!isSorted && search) {
        setIsLoading(true);
        getInitialMovies();
      }
    },
    [search],
  );

  const onSearchReset = async () => {
    setMovies([]);
    setNotFound(false);
    resetForm();
    localStorage.removeItem('search');
    localStorage.removeItem('filter');
    localStorage.removeItem('movies');
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
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
    if (search && search.length > 0) {
      localStorage.setItem('search', JSON.stringify(search));
    }
  }, [search]);

  useEffect(() => {
    console.log('originMovies');
    console.log(originMovies);
    if (originMovies && originMovies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(originMovies));
    }
  }, [originMovies]);

  useEffect(() => {
    const storage = {
      search: JSON.parse(localStorage.getItem('search')),
      movies: JSON.parse(localStorage.getItem('movies')),
      filter: JSON.parse(localStorage.getItem('filter')),
    };
    // resetForm();
    setNotFound(false);
    setIsSorted(false);

    if (storage) {
      if (storage.filter) setNotFound(storage.filter);
      if (storage.movies && storage.movies.length > 0) setMovies(storage.movies);
    }

    console.log(storage);
    console.log('isSorted');
    console.log(isSorted);
  }, []);

  useEffect(() => {
    if (isSorted) {
      getSortedMovies();
    } else {
      setMovies(originMovies);
      setNotFound(false);
    }
    console.log('isSorted');
    console.log(isSorted);
    localStorage.setItem('filter', JSON.stringify(isSorted));
  }, [isSorted]);

  return (
    <main className="movies">
      <SearchForm
        searchValue={search}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onSearchReset={onSearchReset}
        onCheckBoxClick={onCheckBoxClick}
        setIsSorted={setIsSorted}
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
