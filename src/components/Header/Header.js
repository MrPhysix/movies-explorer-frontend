import React, { useMemo } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import HeaderButton from './HeaderButton';
import useScrollPosition from '../../hooks/useScrollPosition';

function Header({ isLogged, handleLogIn }) {
  const scrollPosition = useScrollPosition();
  const style = `header ${scrollPosition > 0 && ' shadow'}`;
  //
  const onLogInClick = useMemo(() => handleLogIn, []);

  return (
    <header className={style}>
      <div className="header__wrapper">
        <Link to={isLogged ? '/movies' : '/'} className="header__logo">
          <img src={Logo} alt="logo" />
        </Link>
        {
          isLogged
          && (
          <nav className="header__menu">
            <Link to="/movies" className="menu_link menu_link_active link-hover">Фильмы</Link>
            <Link to="/saved-movies" className="menu_link link-hover">Сохранённые фильмы</Link>
          </nav>
          )
        }
      </div>
      {
        isLogged
          ? (<Link to="/profile" className="profile_button button-hover">Аккаунт</Link>)
          : (
            <nav className="header__auth">
              <HeaderButton className="link-hover">Регистрация</HeaderButton>
              <HeaderButton className="header__button-green button-hover" onClick={onLogInClick}>Вход</HeaderButton>
            </nav>
          )

      }

    </header>
  );
}

export default Header;
