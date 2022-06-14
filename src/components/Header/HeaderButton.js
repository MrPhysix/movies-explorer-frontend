import React from 'react';
import './HeaderButton.css';

function HeaderButton({ className, children, onClick }) {
  return (
    <button className={`${className} header__button`} type="button" onClick={onClick}>{children}</button>
  );
}

export default HeaderButton;
