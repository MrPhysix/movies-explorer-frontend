import React from 'react';
import './NavTab.css';

function openLink(url) {
  window.open(url, '_blank');
}

function NavTab({ children, link }) {
  return (
    <button className="nav-tab" type="button" onClick={() => openLink(link)}>{children}</button>
  );
}

export default NavTab;
