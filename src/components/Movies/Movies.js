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
  const [lastSearch, setLastSearch] = useState('');
  const [notFound, setNotFound] = useState(false);

  // form hook
  const form = useFormValidator();
  const { search } = form.values;
  const { handleChange, resetForm } = form;

  // handlers
  const getInitialMovies = () => {
    getSearchedMovies(search).then((list) => {
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
    setLastSearch('');
    resetForm();
    localStorage.removeItem('search');
    localStorage.removeItem('movies');
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
  };

  // effects
  useEffect(() => {
    if (search && search.length > 0) {
      localStorage.setItem('search', JSON.stringify(search));
    }
    setLastSearch(search);
  }, [search]);

  useEffect(() => {
    if (originMovies && originMovies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(originMovies));
    }
  }, [originMovies]);

  useEffect(() => {
    setIsSorted(isSorted);
  }, [isSorted]);

  useEffect(() => {
    if (isSorted) {
      getSortedMovies();
    } else {
      setMovies(originMovies);
      setNotFound(false);
    }
  }, [isSorted]);

  useEffect(() => {
    const storage = {
      search: JSON.parse(localStorage.getItem('search')),
      movies: JSON.parse(localStorage.getItem('movies')),
    };
    resetForm();
    setNotFound(false);

    if (storage) {
      if (storage.filter) setIsSorted(storage.filter);
      if (storage.movies && storage.movies.length > 0) {
        setMovies(storage.movies);
        setOriginMovies(storage.movies);
      }
      if (storage.search && storage.search.length > 0) setLastSearch(storage.search);
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        searchValue={lastSearch}
        isSorted={isSorted}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onSearchReset={onSearchReset}
        onCheckBoxClick={onCheckBoxClick}
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
