import React, { useState } from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import useResolution from '../../hooks/useResolution';

function SearchForm() {
  const resolution = useResolution(560);
  const [inputValue, setInputValue] = useState('');

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleReset() {
    setInputValue('');
  }

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form">
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
              />
              <button className="search__input_reset button-hover" type="button" onClick={handleReset} aria-label="close" />
            </div>
            <button className="search__button button-hover button-active" type="button">Найти</button>
          </label>
          {!resolution && <i className="divider" />}
          <FilterCheckbox innerText="Короткометражки" />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
