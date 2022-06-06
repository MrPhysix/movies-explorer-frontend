import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';
import HeaderButton from './HeaderButton';
import userScrollPosition from '../../hooks/userScrollPosition';

function Header() {
  const scrollPosition = userScrollPosition();
  const style = `header ${scrollPosition > 0 && ' shadow'}`;

  return (
    <header className={style}>
      <img src={Logo} alt="logo" className="header__logo" />
      <div className="header__list">
        <HeaderButton className="link-hover">Регистрация</HeaderButton>
        <HeaderButton className="header__button-green button-hover">Вход</HeaderButton>
      </div>
    </header>
  );
}

export default Header;
