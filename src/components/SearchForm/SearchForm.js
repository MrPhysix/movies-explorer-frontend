import React, { useRef, useState, useEffect } from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import useResolution from '../../hooks/useResolution';

function SearchForm({
  onSubmit,
  searchValue,
  handleChange,
  onSearchReset,
  onCheckBoxClick,
  isSorted,
  checkboxIsActive,
  setIsSearched,
}) {
  // refs
  const formRef = useRef();

  // states

  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Фильм');

  // hooks
  const resolution = useResolution(560);

  // handlers
  function onFocus() {
    setFocused(true);
  }

  function onBlur() {
    setFocused(false);
  }

  function handleReset() {
    formRef.current.reset();
    onSearchReset();
    setIsSearched(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSearched(false);
    if (!searchValue || searchValue.length < 1) {
      setPlaceholder('Нужно ввести ключевое слово');
      return handleReset();
    }
    setIsSearched(true);
    return onSubmit();
  }

  const handleCheckbox = () => {
    onCheckBoxClick();
  };
  // effects
  useEffect(() => {
    if (focused) setPlaceholder('Фильм');
  }, [focused]);

  // useEffect(() => {
  //   const search = localStorage.getItem('search');
  //   if (!search || search.length < 1) {
  //     handleReset();
  //   }
  // }, [searchValue]);

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
                name="search"
                type="search"
                className="search__input"
                placeholder={placeholder}
                onChange={handleChange}
                value={searchValue}
                onFocus={onFocus}
                onBlur={onBlur}
                // required
              />
              <button className="search__input_reset button-hover" type="button" onClick={handleReset} aria-label="close" />
            </div>
            <button className="search__button button-hover button-active" type="submit">Найти</button>
          </label>
          {resolution && <i className="divider" />}
          <FilterCheckbox
            innerText="Короткометражки"
            onClick={handleCheckbox}
            isSorted={isSorted}
            checkboxIsActive={checkboxIsActive}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
