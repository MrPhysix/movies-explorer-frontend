import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ innerText }) {
  return (
    <div className="wrapper">
      <label htmlFor="checkbox" className="switch">
        <input type="checkbox" id="checkbox" />
        <div className="slider" />
      </label>
      <p className="text">{innerText}</p>
    </div>
  );
}

export default FilterCheckbox;
