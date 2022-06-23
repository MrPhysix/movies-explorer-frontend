import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll';

function openLink(url) {
  window.open(url, '_blank');
}

function NavTab({
  children, link, anchor, style,
}) {
  return (
    !anchor
      ? (
        <button
          style={style}
          className="nav-tab button-hover"
          type="button"
          onClick={() => openLink(link)}
        >
          {children}
        </button>
      )
      : <Link to={link} offset={-20} spy smooth duration={500} className="nav-tab button-hover">{children}</Link>

  );
}

export default NavTab;
