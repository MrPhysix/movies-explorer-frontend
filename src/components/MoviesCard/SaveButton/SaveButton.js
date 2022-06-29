import React from 'react';
import checkMarkIcon from '../../../images/check-mark.svg';
import crossMarkIcon from '../../../images/cross-mark.svg';

function SaveButton({ isSaved, onClick, cardInSaved }) {
  const style = `movies-card__button button-hover button-active ${isSaved && ' button__is-saved'}`;

  return (
    !cardInSaved ? (
      <button className={style} type="button" onClick={onClick}>
        {
        !isSaved
          ? 'Сохранить'
          : <img src={checkMarkIcon} alt="checkMarkIcon" className="button__inner" />
      }
      </button>
    )
      : (
        <button className={style} type="button" onClick={onClick}>
          <img src={crossMarkIcon} alt="crossMarkIcon" className="button__inner" />
        </button>
      )
  );
}

export default SaveButton;
