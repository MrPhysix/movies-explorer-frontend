import React from 'react';
import './HeaderButton.css';

function HeaderButton({ className, children }) {
  return (
    <button className={`${className} header__button`} type="button">{children}</button>
  );
}

export default HeaderButton;
