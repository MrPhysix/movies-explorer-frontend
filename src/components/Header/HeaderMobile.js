import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import './HeaderMobile.css';
import usePage from '../../hooks/usePage';

function Menu({
  menuIsOpen, handlerMenuOpen, pageMain, pageMovies, pageSavedMovies,
}) {
  return (
    <div className="menu__background">
      <nav className={`menu__nav ${menuIsOpen && 'open'}`}>
        <ul className="menu__nav_links">
          <Link
            to="/"
            onClick={handlerMenuOpen}
            className={`menu__nav_link link-hover ${pageMain && 'active'}`}
          >
            Главная
          </Link>
          <Link
            to="/movies"
            onClick={handlerMenuOpen}
            className={`menu__nav_link link-hover ${pageMovies && 'active'}`}
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            onClick={handlerMenuOpen}
            className={`menu__nav_link link-hover ${pageSavedMovies && 'active'}`}
          >
            Сохраненые фильмы
          </Link>
        </ul>
        <Link
          to="/profile"
          onClick={handlerMenuOpen}
          className="profile_button mobile button-hover"
        >
          Аккаунт
        </Link>
      </nav>
    </div>
  );
}

function HeaderMobile({ isLogged }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [pageMain, pageMovies, pageSavedMovies] = [
    usePage('/'),
    usePage('/movies'),
    usePage('/saved-movies'),
  ];

  const style = `header__mobile_menu ${menuIsOpen && 'open'}`;

  const handlerMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <>
      <div className="header__mobile_wrapper">
        <Link to={isLogged ? '/movies' : '/'} className="header__mobile_logo">
          <img src={Logo} alt="logo" />
        </Link>
        <button
          className={style}
          type="button"
          onClick={handlerMenuOpen}
        >
          <div className="mobile_menu__burger" />
        </button>
      </div>
      {
        menuIsOpen && (
        <Menu
          menuIsOpen={menuIsOpen}
          handlerMenuOpen={handlerMenuOpen}
          pageMain={pageMain}
          pageMovies={pageMovies}
          pageSavedMovies={pageSavedMovies}
        />
        )
      }
    </>
  );
}

export default HeaderMobile;
