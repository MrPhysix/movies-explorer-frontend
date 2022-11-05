import React, { useCallback, useEffect, useState } from 'react';
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

  const [isSearched, setIsSearched] = useState(Boolean);
  const [checkboxIsActive, setCheckboxIsActive] = useState(false);

  // form hook
  const form = useFormValidator();
  const { search } = form.values;
  const { handleChange, resetForm } = form;

  // handlers
  const getInitialSearchedMovies = (value) => {
    setIsLoading(true);
    getSearchedMovies(value)
      .then((list) => {
        localStorage.setItem('movies', JSON.stringify(list));
        if (list.length > 0) {
          setNotFound(false);
          setOriginMovies(list);
          setMovies(list);
          setCheckboxIsActive(true);
        } else {
          setNotFound(true);
          setCheckboxIsActive(false);
        }
      })
      .catch((err) => new Error(err))
      .finally(() => setIsLoading(false));
  };

  const getSortedMovies = (list) => {
    getShortFilteredCards(list)
      .then((res) => {
        if (res && res.length > 0) {
          setMovies(res);
          setNotFound(false);
        } else setNotFound(true);
      })
      .catch((err) => new Error(err));
  };

  const handleSubmit = useCallback(() => {
    if (search && search.length > 0) {
      getInitialSearchedMovies(search);
      if (isSorted) {
        setMovies([]);
        getSearchedMovies(search)
          .then((res) => {
            getSortedMovies(res);
          })
          .catch((err) => new Error(err));
      }
      localStorage.setItem('search', JSON.stringify(search));
      setIsSearched(true);
    }
  }, [search, isSorted]);

  const onSearchReset = () => {
    setMovies([]);
    setOriginMovies([]);
    setNotFound(false);
    setLastSearch('');
    setIsSorted(false);
    setIsSearched(false);
    setCheckboxIsActive(false);
    resetForm();
    localStorage.removeItem('search');
    localStorage.removeItem('movies');
    localStorage.removeItem('filter');
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
    if (!isSorted) {
      getSortedMovies(movies);
    } else {
      setMovies(originMovies);
      setNotFound(false);
    }
    localStorage.setItem('filter', !isSorted);
  };

  // effects
  useEffect(() => {
    setLastSearch(search);
  }, [search]);

  useEffect(() => {
    if (!search || search === '' || search < 1) {
      setCheckboxIsActive(false);
      setIsSearched(false);
      setIsSorted(false);
      // localStorage.removeItem('filter');
    }
  }, [search]);

  useEffect(() => {
    const storageInfo = {
      search: JSON.parse(localStorage.getItem('search')),
      movies: JSON.parse(localStorage.getItem('movies')),
      filter: JSON.parse(localStorage.getItem('filter')),
    };

    if (storageInfo.search) setLastSearch(storageInfo.search);
    if (storageInfo.movies) {
      setIsSearched(true);
      setMovies(storageInfo.movies);
      setOriginMovies(storageInfo.movies);
    }
    if (storageInfo.filter) {
      setOriginMovies(storageInfo.movies);
      setIsSorted(storageInfo.filter);
      setCheckboxIsActive(true);
      getSortedMovies(storageInfo.movies);
    }
  }, []);

  useEffect(() => {
    if (isSearched && !notFound) setCheckboxIsActive(true);
  }, [isSearched, notFound]);

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
        checkboxIsActive={checkboxIsActive}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
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
