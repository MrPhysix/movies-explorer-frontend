import React from 'react';
import './FormElementInput.css';

function FormElementInput({
  optionStyle, labelText, errorText, placeholderText, type,
}) {
  return (
    <label htmlFor="form-element__input" className="form-element__label">
      {labelText}
      <input style={optionStyle} type={!type ? 'input' : type} className="form-element__input_input" id="form-element__input" placeholder={placeholderText} required />
      <i className="form-element__divider" />
      <p className="form-element__error">{errorText && errorText}</p>
    </label>
  );
}

export default FormElementInput;
