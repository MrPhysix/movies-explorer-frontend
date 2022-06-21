import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ innerText, onClick, isFiltered }) {
  return (
    <div className="wrapper">
      <label htmlFor="checkbox" className="switch">
        <input defaultChecked={isFiltered} type="checkbox" id="checkbox" onClick={onClick} />
        <div className="slider" />
      </label>
      <p className="text">{innerText}</p>
    </div>
  );
}

export default FilterCheckbox;
