import React from 'react';
import { Link } from 'react-router-dom';
import './FormElement.css';

function FormElement({
  isFormValid, onSubmit, submitText,
  underText, linkToPath, underLinkText,
  children,
}) {
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {children}
      <nav className="form__nav">
        <button disabled={!isFormValid} className="form__submit button-hover" type="submit">{submitText}</button>
        <p className="form__under-submit">
          {underText}
          {' '}
          <Link to={linkToPath} className="form__under-submit-link link-hover">{underLinkText}</Link>
        </p>
      </nav>
    </form>
  );
}

export default FormElement;
