import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { config, animated, useSpring } from 'react-spring';
import Logo from '../../images/logo.svg';
import HeaderMobile from './HeaderMobile';
import useScrollPosition from '../../hooks/useScrollPosition';
import useResolution from '../../hooks/useResolution';
import usePage from '../../hooks/usePage';

function HeaderButton({ optionStyles, text, path }) {
  return (
    <Link to={path} className={`${optionStyles} header__button`}>{text}</Link>
  );
}

function Header({ isLogged }) {
  // hooks
  const scrollPosition = useScrollPosition();
  const isMobile = useResolution('0', '768');
  // const
  const style = `header ${scrollPosition > 0 && ' shadow'}`;
  const [
    pageMovies,
    pageSavedMovies] = [
    usePage('/movies'),
    usePage('/saved-movies')];
  // libs
  const [anim, setAnim] = useState(false);
  const spring = useSpring({
    scale: 1,
    transform: `rotateZ(${anim ? 360 : 0}deg)`,
    config: config.wobbly,
  });
  const onClick = () => {
    setAnim(!anim);
  };
  //
  return (
    <header className={style}>
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <animated.img src={Logo} alt="logo" style={spring} onClick={onClick} />
        </Link>
        {
          isLogged && !isMobile && (
            <nav className="header__menu">
              <Link to="/movies" className={`menu_link link-hover ${pageMovies && 'active'}`}>Фильмы</Link>
              <Link to="/saved-movies" className={`menu_link link-hover ${pageSavedMovies && 'active'}`}>Сохранённые фильмы</Link>
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
