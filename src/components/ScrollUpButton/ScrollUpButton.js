import React from 'react';
import './ScrollUpButton.css';
import { animateScroll } from 'react-scroll';
import Image from '../../images/scroll-up.svg';
import userScrollPosition from '../../hooks/userScrollPosition';

function ScrollUpButton() {
  const scrolled = Boolean(userScrollPosition() > 100);
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
