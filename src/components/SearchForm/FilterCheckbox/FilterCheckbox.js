import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  innerText, onClick, isSorted,
  checkboxIsActive,
}) {
  return (
    <div className={`wrapper ${!checkboxIsActive && 'disabled'}`}>
      <label htmlFor="checkbox" className="switch">
        <input
          disabled={!checkboxIsActive}
          defaultChecked={isSorted}
          checked={isSorted}
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
