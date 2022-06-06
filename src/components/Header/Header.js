import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';
import HeaderButton from './HeaderButton';

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="logo" className="header__logo" />
      <div className="header__list">
        <HeaderButton className="link-hover">Регистрация</HeaderButton>
        <HeaderButton className="header__button-green button-hover">Вход</HeaderButton>
      </div>
    </header>
  );
}

export default Header;
