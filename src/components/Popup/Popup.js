import React, { useEffect } from 'react';
import './Popup.css';

function Popup({ isOpen, handleClose, children }) {
  // handlers
  const handleCloseByKey = (evt) => (evt.key === 'Escape')
    && handleClose() && evt.target.blur() && console.log('handleCloseByKey');

  const handleOutsideClick = (evt) => {
    const outside = evt.target === evt.currentTarget;
    return outside && handleClose();
  };

  // effects
  useEffect(() => {
    if (!isOpen) return undefined;
    document.addEventListener('keydown', handleCloseByKey);

    return () => document.removeEventListener('keydown', handleCloseByKey);
  }, [isOpen]);

  useEffect(() => { // scroll stop
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <div
      onClick={handleOutsideClick}
      aria-hidden="true"
      className="popup"
    >
      <div className="popup__wrapper">
        {children}
        <button
          className="popup__close-button button-hover"
          type="button"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Popup;
