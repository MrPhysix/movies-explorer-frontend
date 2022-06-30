import React, { useEffect, useState, useCallback } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getSearchedMovies, getShortFilteredCards } from '../../utils/movies';
import useFormValidator from '../../hooks/useFormValidator';

function SavedMovies({ savedMovies, setSavedMovies }) {
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
    getSearchedMovies(search, savedMovies).then((list) => {
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
    setMovies(savedMovies);
    setNotFound(false);
    setLastSearch('');
    resetForm();
    localStorage.removeItem('savedSearch');
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
  };

  // effects
  useEffect(() => {
    if (search && search.length > 0) {
      localStorage.setItem('savedSearch', JSON.stringify(search));
    }
    setLastSearch(search);
  }, [search]);

  useEffect(() => {
    if (originMovies && originMovies.length > 0) {
      localStorage.setItem('savedMovies', JSON.stringify(originMovies));
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
      search: JSON.parse(localStorage.getItem('savedSearch')),
      movies: JSON.parse(localStorage.getItem('savedMovies')),
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

  useEffect(() => {
    setMovies(savedMovies);
    setOriginMovies(savedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <main className="movies">
      <SearchForm
        searchValue={lastSearch}
        isSorted={isSorted}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onSearchReset={onSearchReset}
        onCheckBoxClick={onCheckBoxClick}
        inSavedMovies
      />
      <MoviesCardList
        movies={movies}
        notFound={notFound}
        isLoading={isLoading}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
        inSavedMovies
      />
    </main>
  );
}

export default SavedMovies;
