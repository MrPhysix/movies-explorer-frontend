import React, { useState } from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search-icon.svg';
import ResetIcon from '../../images/close-button.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {
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
            <div className="search__input_wrapper">
              <img src={SearchIcon} alt="search icon" className="search__icon" />
              <input
                className="search__input"
                placeholder="Фильм"
                onChange={handleChange}
                value={inputValue}
              />
              <button className="search__reset button-hover" type="button" onClick={handleReset}>
                <img src={ResetIcon} alt="reset" style={{ maxWidth: '15px' }} />
              </button>
            </div>
            <button className="search__button button-hover" type="button">Найти</button>
          </label>
          <i className="divider" />
          <FilterCheckbox innerText="Короткометражки" />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
