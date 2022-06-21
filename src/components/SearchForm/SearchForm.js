import React, { useRef } from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import useResolution from '../../hooks/useResolution';

function SearchForm({
  inputValue, setInputValue, onSubmit, setNotFound, setMovies, setIsFiltered, searched,
}) {
  const resolution = useResolution(560);
  // refs
  const formRef = useRef();

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleReset() {
    setInputValue('');
    setNotFound(false);
    setMovies([]);
    formRef.current.reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (inputValue.length < 1 || inputValue.match(/^ *$/) !== null || inputValue === null) {
      alert('Нужно ввести ключевое слово');
      handleReset();
    } else onSubmit();
  }

  const handleCheckbox = () => {
    setIsFiltered((prev) => !prev);
  };

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form" onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="search__input" className="search">
            {
              !resolution && <img src={SearchIcon} alt="search icon" className="search__icon" />
            }
            <div className="search__input_wrapper">
              <input
                type="search"
                className="search__input"
                placeholder="Фильм"
                onChange={handleChange}
                value={inputValue}
                // required
              />
              <button className="search__input_reset button-hover" type="button" onClick={handleReset} aria-label="close" />
            </div>
            <button className="search__button button-hover button-active" type="submit">Найти</button>
          </label>
          {!resolution && <i className="divider" />}
          {searched && <FilterCheckbox innerText="Короткометражки" onClick={handleCheckbox} />}
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
