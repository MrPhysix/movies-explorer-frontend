import React, { useRef, useState, useEffect } from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import useResolution from '../../hooks/useResolution';

function SearchForm({
  inputValue, setInputValue, onSubmit,
  setNotFound, setMovies, isFiltered, filterHandle,
  searched, inSavedMovies,
}) {
  console.log('inSavedMovies');
  console.log(inSavedMovies);
  // states
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Фильм');
  // hooks
  const resolution = useResolution(560);
  // refs
  const formRef = useRef();

  // handlers
  function onFocus() {
    setFocused(true);
  }

  function onBlur() {
    setFocused(false);
  }

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleReset() {
    const token = localStorage.getItem('jwt');
    setInputValue('');
    setNotFound(false);
    setMovies([]);
    localStorage.clear();
    localStorage.setItem('jwt', token);
    formRef.current.reset();
    filterHandle(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (inputValue.length < 1 || inputValue.match(/^ *$/) !== null || inputValue === null) {
      setPlaceholder('Нужно ввести ключевое слово');
      handleReset();
    } else onSubmit();
  }

  const handleCheckbox = async (evt) => {
    const checked = await evt.target.checked;
    filterHandle(checked);
  };
  // effects
  useEffect(() => {
    if (focused) setPlaceholder('Фильм');
  }, [focused]);

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form
          className="search-form__form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label htmlFor="search__input" className="search">
            {
              !resolution && <img src={SearchIcon} alt="search icon" className="search__icon" />
            }
            <div className="search__input_wrapper">
              <input
                type="search"
                className="search__input"
                placeholder={placeholder}
                onChange={handleChange}
                value={inputValue}
                onFocus={onFocus}
                onBlur={onBlur}
                // required
              />
              <button className="search__input_reset button-hover" type="button" onClick={handleReset} aria-label="close" />
            </div>
            <button className="search__button button-hover button-active" type="submit">Найти</button>
          </label>
          {resolution && searched && !inSavedMovies && <i className="divider" />}
          {searched && !inSavedMovies && <FilterCheckbox innerText="Короткометражки" onClick={handleCheckbox} isFiltered={isFiltered} />}
          {resolution && inSavedMovies && <i className="divider" />}
          {inSavedMovies && <FilterCheckbox innerText="Короткометражки" onClick={handleCheckbox} isFiltered={isFiltered} />}
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
