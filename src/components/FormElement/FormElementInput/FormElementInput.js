import React from 'react';
import './FormElementInput.css';

function FormElementInput({
  name, type, optionStyle, labelText, errorText,
  placeholderText, pattern, value, onChange, minLength, maxLength,
}) {
  return (
    <label htmlFor={name} className="form-element__label">
      {labelText}
      <input
        id={name}
        name={name}
        style={optionStyle}
        type={!type ? 'text' : type}
        className="form-element__input_input"
        placeholder={placeholderText}
        pattern={pattern}
        value={value}
        defaultValue=""
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <i className={`form-element__divider ${errorText && 'error'}`} />
      <p className="form-element__error">{errorText}</p>
    </label>
  );
}

export default FormElementInput;
