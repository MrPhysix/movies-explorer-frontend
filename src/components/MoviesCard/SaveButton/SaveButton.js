import React from 'react';
import checkMarkIcon from '../../../images/check-mark.svg';

function SaveButton({ isSaved, onClick }) {
  const style = `movies-card__button button-hover button-active ${isSaved && ' button__is-saved'}`;

  return (
    <button className={style} type="button" onClick={onClick}>
      {
        !isSaved
          ? 'Сохранить'
          : <img src={checkMarkIcon} alt="checkMarkIcon" className="button__inner" />
      }
    </button>
  );
}

export default SaveButton;
