import React, { useEffect, useState, useCallback } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getSearchedMovies, getShortFilteredCards } from '../../utils/movies';
import useFormValidator from '../../hooks/useFormValidator';
// import MainApi from '../../utils/api/MainApi';

function SavedMovies({ savedMovies, setSavedMovies }) {
  // const
  // states
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [originMovies, setOriginMovies] = useState([]);

  const [isSorted, setIsSorted] = useState(Boolean);
  const [lastSearch, setLastSearch] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [isSearched, setIsSearched] = useState(Boolean);
  const [checkboxIsActive, setCheckboxIsActive] = useState(true);

  // form hook
  const form = useFormValidator();
  const { search } = form.values;
  const { handleChange, resetForm } = form;

  // handlers
  const getInitialMovies = (value) => {
    setIsLoading(true);
    getSearchedMovies(value, savedMovies)
      .then((list) => {
        if (list.length > 0) {
          setNotFound(false);
          setOriginMovies(list);
          setMovies(list);
        } else {
          setNotFound(true);
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
      getInitialMovies(search);
      if (isSorted) {
        setMovies([]);
        getSearchedMovies(search, savedMovies)
          .then((res) => {
            setOriginMovies(res);
            getSortedMovies(res);
          })
          .catch((err) => new Error(err));
      }
      setIsSearched(true);
    }
  }, [search, isSorted]);

  const onSearchReset = () => {
    setNotFound(false);
    setLastSearch('');
    setIsSorted(false);
    setIsSearched(false);
    resetForm();
    setOriginMovies(savedMovies);
    setMovies(savedMovies);
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
    if (!isSorted) {
      getSortedMovies(movies);
    } else {
      setMovies(originMovies);
      setNotFound(false);
    }
  };

  // effects
  useEffect(() => {
    setLastSearch(search);
  }, [search]);

  useEffect(() => {
    setCheckboxIsActive(!notFound);
    if (notFound) {
      setIsSorted(false);
    }
  }, [notFound]);

  useEffect(() => {
    setOriginMovies(savedMovies);
    setMovies(savedMovies);
  }, []);
  //
  useEffect(() => {
    setMovies(savedMovies);
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
        inSavedMovies
      />
    </main>
  );
}

export default SavedMovies;
