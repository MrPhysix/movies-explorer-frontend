import React, { useEffect, useState } from 'react';
import './ScrollUpButton.css';
import { animateScroll } from 'react-scroll';
import Image from '../../images/scroll-up.svg';

function ScrollUpButton() {
  const [scrolled, setScrolled] = useState(false);

  const style = `scroll-up_button button-hover ${scrolled ? ' show' : ''}`;

  function logScroll() {
    setScrolled(Boolean(window.scrollY > 1100));
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logScroll);
    };
  });

  return (
    <button
      className={style}
      type="button"
      onClick={() => animateScroll.scrollToTop({
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart',
        spy: true,
      })}
    >
      <img src={Image} alt="scroll-up" style={{ maxWidth: '15px' }} />
    </button>
  );
}

export default ScrollUpButton;
