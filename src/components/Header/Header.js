import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import HeaderMobile from './HeaderMobile';
import useScrollPosition from '../../hooks/useScrollPosition';
import useResolution from '../../hooks/useResolution';

function HeaderButton({ optionStyles, text, path }) {
  return (
    <Link to={path} className={`${optionStyles} header__button`}>{text}</Link>
  );
}

function Header({ isLogged }) {
  const scrollPosition = useScrollPosition();
  const isMobile = useResolution('0', '768');

  const style = `header ${scrollPosition > 0 && ' shadow'}`;
  //

  return (
    <header className={style}>
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <img src={Logo} alt="logo" />
        </Link>
        {
          isLogged && !isMobile && (
            <nav className="header__menu">
              <Link to="/movies" className="menu_link menu_link_active link-hover">Фильмы</Link>
              <Link to="/saved-movies" className="menu_link link-hover">Сохранённые фильмы</Link>
            </nav>
          )
      }
      </div>
      {
        isLogged ? (
          <div>
            {
            !isMobile
              ? <Link to="/profile" className="profile_button button-hover">Аккаунт</Link>
              : <HeaderMobile />
          }
          </div>
        )
          : (
            <nav className="header__auth">
              <HeaderButton
                optionStyles="link-hover"
                path="/signup"
                text="Регистрация"
              />
              <HeaderButton
                optionStyles="header__button_green button-hover"
                path="/signin"
                text="Вход"
              />
            </nav>
          )
      }
    </header>
  );
}

export default Header;
