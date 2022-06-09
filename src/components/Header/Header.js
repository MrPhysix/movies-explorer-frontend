import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import HeaderButton from './HeaderButton';
import userScrollPosition from '../../hooks/userScrollPosition';

function Header({ isLogged }) {
  const scrollPosition = userScrollPosition();
  const style = `header ${scrollPosition > 0 && ' shadow'}`;

  return (
    <header className={style}>
      <div className="header__wrapper">
        <Link to="/">
          <img src={Logo} alt="logo" className="header__logo" />
        </Link>
        {
          isLogged
          && (
          <nav className="header__menu">
            <Link to="/movies" className="menu_link menu_link_active link-hover">Фильмы</Link>
            <Link to="/watchlist" className="menu_link link-hover">Сохранённые фильмы</Link>
          </nav>
          )
        }
      </div>
      {
        isLogged
          ? (<Link to="/" className="profile_button button-hover">Аккаунт</Link>)
          : (
            <nav className="header__auth">
              <HeaderButton className="link-hover">Регистрация</HeaderButton>
              <HeaderButton className="header__button-green button-hover">Вход</HeaderButton>
            </nav>
          )

      }

    </header>
  );
}

export default Header;
