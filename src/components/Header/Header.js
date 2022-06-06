import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';
import HeaderButton from './HeaderButton';

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="logo" className="header__logo" />
      <div className="header__list">
        <HeaderButton className="">Регистрация</HeaderButton>
        <HeaderButton className="header__button-green">Вход</HeaderButton>
      </div>
    </header>
  );
}

export default Header;
