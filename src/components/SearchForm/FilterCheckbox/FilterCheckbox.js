import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  isSearched, innerText, onClick, isSorted,
}) {
  return (
    <div className={`wrapper ${!isSearched && 'disabled'}`}>
      <label htmlFor="checkbox" className="switch">
        <input
          disabled={!isSearched}
          defaultChecked={isSorted}
          type="checkbox"
          id="checkbox"
          onClick={onClick}
        />
        <div className="slider" />
      </label>
      <p className="text">{innerText}</p>
    </div>
  );
}

export default FilterCheckbox;
