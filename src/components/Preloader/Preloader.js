import React from 'react';
import './Preloader.css';

function Preloader({ style }) {
  return (
    <div className="preloader" style={style}>
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
}

export default Preloader;
