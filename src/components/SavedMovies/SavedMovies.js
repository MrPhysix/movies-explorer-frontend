import React, { useCallback, useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ savedMovies, setSavedMovies }) {
  // storage
  const storage = {
    search: JSON.parse(localStorage.getItem('savedSearch')),
    filter: JSON.parse(localStorage.getItem('savedFilter')),
  };
  // states
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isFiltered, setIsFiltered] = useState(Boolean);
  // handlers

  const onSubmit = useCallback(() => console.log('onSbm'), [inputValue]);
  //
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
        inSavedMovies
      />
      <MoviesCardList
        inSavedMovies
        movies={savedMovies}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
        notFound={notFound}
        isLoading={false}
      />
    </main>
  );
}

export default SavedMovies;
