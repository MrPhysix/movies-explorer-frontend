import React from 'react';
import './ScrollUpButton.css';
import { animateScroll } from 'react-scroll';
import Image from '../../images/scroll-up.svg';
import useScrollPosition from '../../hooks/useScrollPosition';

function ScrollUpButton() {
  const scrolled = Boolean(useScrollPosition() > window.innerHeight);
  const style = `scroll-up_button button-hover ${scrolled && ' show'}`;

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
