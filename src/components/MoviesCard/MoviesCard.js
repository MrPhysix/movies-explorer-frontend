import React from 'react';
import './MoviesCard.css';
import checkMarkIcon from '../../images/check-mark.svg';

function MoviesCard({ item, isSaved }) {
  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h3 className="movies-card__title ">{item.title}</h3>
        <data className="movies-card__time">27 минут</data>
      </div>
      <img src={item.image} alt={item.title} />
      {
        !isSaved
          ? (
            <button className="movies-card__button button-hover" type="button">
              Сохранить
            </button>
          )
          : (
            <button className="movies-card__button button-hover button__is-saved" type="button">
              <img src={checkMarkIcon} alt="checkMarkIcon" className="button__inner" />
            </button>
          )
      }
    </li>
  );
}

export default MoviesCard;
