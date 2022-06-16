import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import './HeaderMobile.css';

function HeaderMobile({ isLogged }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const style = `header__mobile_menu ${menuIsOpen && 'open'}`;
  const clickHandler = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className="header__mobile_wrapper">
      <Link to={isLogged ? '/movies' : '/'} className="header__mobile_logo">
        <img src={Logo} alt="logo" />
      </Link>
      <button
        className={style}
        type="button"
        onClick={clickHandler}
      >
        <div className="mobile_menu__burger" />
      </button>
    </div>
  );
}

export default HeaderMobile;
