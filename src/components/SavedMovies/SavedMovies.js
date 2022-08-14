import React, { useEffect, useState, useCallback } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getSearchedMovies, getShortFilteredCards } from '../../utils/movies';
import useFormValidator from '../../hooks/useFormValidator';
import MainApi from '../../utils/api/MainApi';

function SavedMovies({ savedMovies, setSavedMovies }) {
  // const
  // states
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);

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
  const getInitialMovies = () => {
    setIsLoading(true);
    getSearchedMovies(search, savedMovies).then((list) => {
      if (list.length > 0) {
        setNotFound(false);
        setMovies(list);
        setCheckboxIsActive(true);
      } else {
        setCheckboxIsActive(false);
        setNotFound(true);
      }
    }).finally(() => setIsLoading(false));
  };

  const getSortedMovies = (list) => {
    getShortFilteredCards(list).then((res) => {
      if (res && res.length > 0) {
        setMovies(res);
        setNotFound(false);
      } else setNotFound(true);
    });
  };

  // const handleSubmit = useCallback(
  //   () => {
  //     if (!isSorted && search) {
  //       setIsLoading(true);
  //       getInitialMovies();
  //     }
  //   },
  //   [search],
  // );

  const handleSubmit = useCallback(() => {
    if (search && search.length > 0) {
      getInitialMovies(search);
      if (isSorted) {
        setMovies([]);
        getSearchedMovies(search)
          .then((res) => {
            getSortedMovies(res);
          });
      }
      localStorage.setItem('savedSearch', JSON.stringify(search));
      setIsSearched(true);
    }
  }, [search, isSorted]);

  // const onSearchReset = async () => {
  //   setMovies(savedMovies);
  //   setNotFound(false);
  //   setLastSearch('');
  //   setIsSorted(false);
  //   resetForm();
  //   localStorage.removeItem('savedSearch');
  //   localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  // };

  const onSearchReset = () => {
    setNotFound(false);
    setLastSearch('');
    setIsSorted(false);
    setIsSearched(false);
    resetForm();
    localStorage.removeItem('savedSearch');
    localStorage.removeItem('savedFilter');
    setMovies(savedMovies);
  };

  const onCheckBoxClick = () => {
    setIsSorted(!isSorted);
    if (!isSorted) {
      getSortedMovies(movies);
    } else {
      setMovies(savedMovies);
      setNotFound(false);
    }
    localStorage.setItem('savedFilter', !isSorted);
  };

  // effects
  useEffect(() => {
    setLastSearch(search);
  }, [search]);

  useEffect(() => {
    if (!search || search === '' || search < 1) {
      console.log('search 0');
      setCheckboxIsActive(false);
      setIsSearched(false);
      setIsSorted(false);
      // localStorage.removeItem('savedFilter');
    }
  }, [search]);

  useEffect(() => {
    if (isSorted) {
      getSortedMovies(savedMovies);
    } else {
      setMovies(savedMovies);
      setNotFound(false);
    }
  }, [isSorted]);

  useEffect(() => {
    const storageInfo = {
      search: JSON.parse(localStorage.getItem('savedSearch')),
      filter: JSON.parse(localStorage.getItem('savedFilter')),
    };
    if (storageInfo.search) setLastSearch(storageInfo.search);

    if (storageInfo.filter) {
      setIsSorted(storageInfo.filter);
      setCheckboxIsActive(true);
      getSortedMovies(savedMovies);
    }
  }, []);

  useEffect(() => {
    if (isSearched && !notFound) setCheckboxIsActive(true);
  }, [isSearched, notFound]);

  useEffect(() => {
    MainApi.getSavedMovies()
      .then((res) => setSavedMovies(res));
  }, []);

  useEffect(() => {
    console.log(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    setMovies(savedMovies);
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
