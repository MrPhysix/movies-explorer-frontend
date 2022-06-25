import React, { useEffect } from 'react';
import './Popup.css';
import { config, animated, useTransition } from 'react-spring';

function Popup({ isOpen, handleClose, children }) {
  // libs
  const popupTransition = useTransition(isOpen, {
    config: config.wobbly,
    from: { scale: 0, opacity: 1 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0, opacity: 0 },
  });

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
      className={`popup ${isOpen && 'open'}`}
    >
      {
        popupTransition((style, item) => item && (
        <animated.div className={`popup__wrapper ${children.props.failed && 'fail'}`} style={style}>
          {children}
          <button
            className="popup__close-button button-hover"
            type="button"
            onClick={handleClose}
          >
            &times;
          </button>
        </animated.div>
        ))
      }
    </div>
  );
}

export default Popup;
