import React, { useCallback, useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MainApi from '../../utils/api/MainApi';

function SavedMovies() {
  // storage
  const storage = {
    search: JSON.parse(localStorage.getItem('savedSearch')),
    filter: JSON.parse(localStorage.getItem('savedFilter')),
  };
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isFiltered, setIsFiltered] = useState(Boolean);
  // handlers
  function getSavedMovies() {
    setIsLoading(true);
    try {
      MainApi.getSavedMovies()
        .then((res) => setMovies(res))
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }
  const onSubmit = useCallback(() => getSavedMovies(), [inputValue]);
  //

  useEffect(() => {
    getSavedMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

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
    <main className="saved-movies">
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
      <MoviesCardList inSavedMovies movies={movies} notFound={notFound} isLoading={isLoading} />
    </main>
  );
}

export default SavedMovies;
