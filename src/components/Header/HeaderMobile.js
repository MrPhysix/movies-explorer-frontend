import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import './HeaderMobile.css';
import usePage from '../../hooks/usePage';

function HeaderMobile() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [pageMain, pageMovies, pageSavedMovies] = [
    usePage('/'),
    usePage('/movies'),
    usePage('/saved-movies'),
  ];
  const style = `header__mobile_menu ${menuIsOpen && 'open'}`;

  // handlers
  const handlerMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleOutsideClick = (evt) => {
    const outside = evt.target === evt.currentTarget;
    return outside && handlerMenuOpen();
  };

  useEffect(() => { // scroll stop
    if (menuIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuIsOpen]);

  return (
    <>
      <div className="header__mobile_wrapper">
        <Link to="/" className="header__mobile_logo">
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
        <div
          className="menu__background"
          aria-hidden="true"
          role="button"
          onClick={handleOutsideClick}
        >
          <nav className="menu__nav">
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
        )
      }
    </>
  );
}

export default HeaderMobile;